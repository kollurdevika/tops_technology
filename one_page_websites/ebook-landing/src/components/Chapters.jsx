import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const Chapters = () => {
    const chapters = [
        {
            title: "Chapter 1: Understanding Fashion Marketing",
            content: "Introduction to the basics of fashion marketing including market research, branding, and understanding your target audience.",
            pages: "15 Pages"
        },
        {
            title: "Chapter 2: Building Your Brand Identity",
            content: "Learn how to create a strong, consistent brand identity that resonates with your customers and stands out in a crowded market.",
            pages: "22 Pages"
        },
        {
            title: "Chapter 3: Digital Marketing Strategies",
            content: "Dive into social media marketing, email campaigns, and influencer partnerships to grow your reach online.",
            pages: "30 Pages"
        },
        {
            title: "Chapter 4: Sales & Distribution",
            content: "Effective strategies for selling your designs, managing inventory, and choosing the right distribution channels.",
            pages: "18 Pages"
        }
    ];

    return (
        <section className="section-padding bg-white" id="chapter">
            <Container>
                <Row className="justify-content-center mb-5">
                    <Col md={8} className="text-center">
                        <span className="text-yellow">Course Curriculum</span>
                        <h2 className="section-title">Chapters Inside</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <Accordion defaultActiveKey="0" className="custom-accordion">
                            {chapters.map((chapter, index) => (
                                <Accordion.Item eventKey={index.toString()} key={index} className="mb-3 border-0 shadow-sm rounded-3 overflow-hidden">
                                    <Accordion.Header className="py-2">
                                        <div className="d-flex justify-content-between w-100 pe-3 align-items-center">
                                            <span className="fw-bold">{chapter.title}</span>
                                            <span className="badge bg-light text-dark fw-normal">{chapter.pages}</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body className="text-muted">
                                        {chapter.content}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Col>
                </Row>
            </Container>
            <style>{`
        .custom-accordion .accordion-button:not(.collapsed) {
            background-color: #fff8e1;
            color: #3a3431;
            box-shadow: none;
        }
        .custom-accordion .accordion-button:focus {
            box-shadow: none;
            border-color: rgba(0,0,0,.125);
        }
        .custom-accordion .accordion-button {
            font-weight: 600;
            color: #3a3431;
        }
      `}</style>
        </section>
    );
};

export default Chapters;
