import React, {Component} from 'react';
import ActiveLink from './ActiveLink';


class AboutOne extends Component {
    constructor(){
        super()
        this.state = {
            startCounter: false
        }
    }

    onVisibilityChange = isVisible => {
        if (isVisible) {
            this.setState({startCounter: true});
        }
    }

    render() {
        return (
            <section className="about-one " style={{overflowY:"hidden"}}>
                <img src="assets/images/circle-stripe.png" className="about-one__circle" alt="" />
                    <div className="container text-center">
                        <div className="block-title text-center">
                            <h2 className="block-title__title">Let’s do study with <br />
                                expert teachers</h2>
                        </div>
                        <div className="about-one__img">
                            <div className="row">
                                <div className="col-lg-6">
                                    <img src="assets/images/blog-3.jpg" alt="" width="500" height="298"/>
                                </div>
                                <div className="col-lg-6">
                                    <img src="assets/images/about-2.png" alt="" width="500" height="298"/>
                                </div>
                            </div>
                          
                        </div>
                        <p className="about-one__text">There are many variations of passages of lorem ipsum available, but
                            the majority have
                            <br />
                                suffered alteration in some form, by injected humour words which don't look even
                                slightly <br /> believable.
                                Lorem
                                Ipsn gravida nibh vel velit auctor aliquetn auci elit cons.</p>
                        <ActiveLink href="/contact" className="thm-btn about-one__btn" text="Start Your Own Blog"/>
                    </div>
            </section>
        );
    }
}

export default AboutOne;