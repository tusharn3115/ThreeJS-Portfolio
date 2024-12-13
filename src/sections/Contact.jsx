import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

    const formRef = useRef()
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await emailjs.send(
                'service_4p8zn8q',  // service id
                'template_ggrysys', // template id
                {
                    from_name: form.name,
                    to_name: 'Tushar',
                    form_email: form.email,
                    to_email: 'negitushar923@gmail.com',
                    message: form.message,
                },
                'UCeJ3eCnEkU_n69jU' // public id
            );

            setLoading(false);
            toast.success('Message sent successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            setLoading(false);
            toast.error('Something went wrong. Please try again later.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <section className='c-space my-20'>
            <div className='relative min-h-screen flex items-center justify-center flex-col'>
                <img src="/assets/terminal.png" alt="terminal bg" className='absolute inset-0 min-h-screen' />
                <div className='contact-container'>
                    <h3 className='head-text mt-12'>Let's Talk</h3>
                    <p className='text-xl text-white-600 mt-3'>Whether you're planning to build a new website, enhance your current platform, or bring a unique idea to life, I'm here to assist you every step of the way.</p>

                    <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col space-y-7'>
                        <label htmlFor="" className='space-y-3'>
                            <span className='field-label'>Full Name</span>
                            <input
                                type="text"
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                                required
                                autoComplete='off'
                                className='field-input'
                                placeholder='Your name...'
                            />
                        </label>
                        <label htmlFor="" className='space-y-3'>
                            <span className='field-label'>Email</span>
                            <input
                                type="email"
                                name='email'
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete='off'
                                className='field-input'
                                placeholder='example@gmail.com'
                            />
                        </label>
                        <label htmlFor="" className='space-y-3'>
                            <span className='field-label'>Your Message</span>
                            <textarea
                                name='message'
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                autoComplete='off'
                                className='field-input resize-none'
                                placeholder="Hi, I'm intrested in..."
                            />
                        </label>

                        <button className='field-btn' type='submit' disabled={loading}>
                            {loading ? "Sending..." : "Send Message"}

                            <img src="/assets/arrow-up.png" alt="arrow-up" className='field-btn_arrow' />
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Contact