// js/formHandler.js
import { StorageUtil } from './utils.js';

export default class CustomerFormHandler {
  constructor({ form, storageKey = 'submissions', messageContainer = null }) {
    this.form = form;
    this.storageKey = storageKey;
    this.msgContainer = messageContainer;
    this.init();
  }

  init() {
    // Event delegation: input/blur and submit on the form element
    this.form.addEventListener('input', (e) => this.onInput(e));
    this.form.addEventListener('blur', (e) => this.onInput(e), true); // capture blur via true
    this.form.addEventListener('submit', (e) => this.onSubmit(e));
    // delegation for buttons if any inside form
    this.form.addEventListener('click', (e) => {
      const t = e.target;
      if (t.matches('[data-action="reset"]')) {
        this.clearForm();
      }
    });
  }

  getValues() {
    const fd = new FormData(this.form);
    const obj = {};
    for (const [k, v] of fd.entries()) obj[k] = (typeof v === 'string') ? v.trim() : v;
    return obj;
  }

  onInput(e) {
    const field = e.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
    this._validateField(field.name, field);
  }

  _validateField(name, el) {
    const val = (el.value || '').trim();
    // validation map
    let ok = true;
    let msg = '';

    const today = new Date();
    today.setHours(0,0,0,0);

    switch (name) {
      case 'name':
        ok = val.length >= 3;
        msg = 'Name must be at least 3 characters.';
        break;
      case 'phone':
        ok = /^\d{10}$/.test(val);
        msg = 'Phone must be exactly 10 digits.';
        break;
      case 'email':
        ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        msg = 'Enter valid email.';
        break;
      case 'address':
        ok = val.length > 0;
        msg = 'Address is required.';
        break;
      case 'aadhar':
        ok = /^\d{12}$/.test(val);
        msg = 'Aadhar must be exactly 12 digits.';
        break;
      case 'checkin':
        {
          const d = new Date(val);
          ok = val && !isNaN(d) && d >= today;
          msg = 'Check-in must be today or a future date.';
        }
        break;
      case 'checkout':
        {
          const ci = new Date(this.form.elements['checkin'].value);
          const co = new Date(val);
          ok = val && !isNaN(co) && (co > ci);
          msg = 'Check-out must be after check-in.';
        }
        break;
      case 'adults':
        ok = val !== '' && Number(val) >= 1;
        msg = 'Number of adults must be 1 or more.';
        break;
      case 'purpose':
        ok = val.length >= 10;
        msg = 'Purpose must be at least 10 characters.';
        break;
      default:
        ok = true;
    }

    // UI feedback
    el.classList.remove('invalid', 'valid');
    if (!ok) {
      el.classList.add('invalid');
      el.setAttribute('data-error', msg);
    } else {
      el.classList.add('valid');
      el.removeAttribute('data-error');
    }

    return { ok, msg };
  }

  validateForm() {
    const elements = Array.from(this.form.elements).filter(el => el.name);
    let allOk = true;
    const errors = {};
    for (const el of elements) {
      const { ok, msg } = this._validateField(el.name, el);
      if (!ok) {
        allOk = false;
        errors[el.name] = msg;
      }
    }

    return { valid: allOk, errors };
  }

  showMessage({ text = '', type = 'success', duration = 3000 } = {}) {
    if (!this.msgContainer) {
      alert(`${type.toUpperCase()}: ${text}`);
      return;
    }
    const id = 'msg-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = `alert alert-${type} shadow-sm`;
    div.textContent = text;
    this.msgContainer.appendChild(div);
    setTimeout(() => {
      div.classList.add('fade');
      div.remove();
    }, duration);
  }

  saveToLocalStorage(data) {
    const entries = StorageUtil.getItem(this.storageKey) || [];
    // add timestamp id
    data.id = Date.now().toString(36);
    entries.push(data);
    const ok = StorageUtil.setItem(this.storageKey, entries);
    return ok ? data : null;
  }

  clearForm() {
    this.form.reset();
    // remove validation classes
    Array.from(this.form.elements).forEach(el => {
      if (el.classList) el.classList.remove('invalid','valid');
      el.removeAttribute('data-error');
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { valid, errors } = this.validateForm();
    if (!valid) {
      // show first error message
      const firstKey = Object.keys(errors)[0];
      this.showMessage({ text: errors[firstKey], type: 'danger', duration: 5000 });
      return;
    }

    const payload = this.getValues();
    // add meta data
    payload.submittedAt = new Date().toISOString();
    const saved = this.saveToLocalStorage(payload);
    if (saved) {
      this.showMessage({ text: 'Submission saved successfully!', type: 'success', duration: 3000 });
      this.clearForm();
    } else {
      this.showMessage({ text: 'Failed to save. Storage error.', type: 'danger', duration: 4000 });
    }
  }
}
