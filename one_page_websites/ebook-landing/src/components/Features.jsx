import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBookReader, FaLaptop, FaAward } from 'react-icons/fa';

const Features = () => {
    const features = [
        {
            icon: <FaBookReader />,
            title: "Easy to Read",
            desc: "Optimized for all devices with clear typography and layout."
        },
        {
            icon: <FaLaptop />,
            title: "Digital Access",
            desc: "Get instant access to digital resources and bonus materials."
        },
        {
            icon: <FaAward />,
            title: "Award Winning",
            desc: "Recognized by top industry experts for quality content."
        }
    ];

    return (
        <section className="section-padding bg-light-custom" id="about">
            <Container>
                <Row className="justify-content-center text-center">
                    <Col md={8}>
                        <span className="text-yellow">What's Inside</span>
                        <h2 className="section-title">Why This Book?</h2>
                    </Col>
                </Row>
                <Row>
                    {features.map((feature, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <div className="card-custom text-center">
                                <div className="icon-box mx-auto">
                                    {feature.icon}
                                </div>
                                <h4 className="mb-3 font-weight-bold" style={{ color: '#3a3431' }}>{feature.title}</h4>
                                <p className="text-muted">{feature.desc}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Features;
