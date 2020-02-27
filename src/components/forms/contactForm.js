import React, { useState } from "react"
import styled from "styled-components"
import device from "../device"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

const FormWrapper = styled.div`
  width: 65%;
  max-width: 1000px;
  margin: 4rem 0;
  ${device.small`width: 100%;`}
  ${device.large`margin: 8rem 0;`}
`

const FieldWrapper = styled.div`
  margin-top: 4rem;
  position: relative;
  line-height: 1.2;
  ${device.large`margin-top: 8rem;`}
  label {
    z-index: -1;
    position: absolute;
    top: 0;
    transform-origin: left top;
    transition: all 0.25s cubic-bezier(0, 0, 0.25, 1);
    font-family: "Gilroy Bold";
    font-size: 4rem;
    -webkit-text-fill-color: var(--black);
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: var(--white);
    opacity: 0.2;
    ${device.small`font-size: 2.5rem;`}
    ${device.large`font-size: 6rem;`}
    &.active {
      transform: scale(0.3) translateY(-100%);
      -webkit-text-fill-color: var(--white);
      -webkit-text-stroke-width: 0;
      ${device.small`transform: scale(0.5) translateY(-100%);`}
    }
  }
  .input {
    color: var(--white);
    width: 100%;
    font-size: 4rem;
    display: block;
    border: 0;
    border-bottom: 1px solid var(--white);
    background: transparent;
    ${device.small`font-size: 2.5rem;`}
    ${device.large`font-size: 6rem;`}
  }
  textarea.scroll {
    font-size: 2rem;
    ${device.small`font-size: 1.5rem;`}
    ${device.large`font-size: 3rem;`}
  }
  .error {
    font-size: 0.8rem;
    margin: 0.5rem 0;
    position: absolute;
    right: 0;
    top: 50%;
    color: tomato;
  }
`

const ButtonWrapper = styled.div`
  margin-top: 6rem;
  text-align: right;
`

const SubmitError = styled.div``

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("required field"),
  email: Yup.string()
    .email("invalid email")
    .required("required field"),
})

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const ContactForm = () => {
  const [error, setError] = useState(false)

  function handleSubmit(values, setSubmitting, resetForm) {
    fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...values,
      }),
    })
      .then(() => {
        resetForm()
        console.log("submitted")
      })
      .catch(() => {
        setError(true)
        console.log("error")
      })
    setSubmitting(false)
  }

  function animate(e) {
    if (e.target.name === "msg") {
      e.target.classList.remove("scroll")
      if (e.target.scrollHeight >= 250) {
        e.target.classList.add("scroll")
        e.target.style.overflow = "auto"
        return
      }
      e.target.style.overflow = "hidden"
      e.target.style.height = "auto"
      e.target.style.height = `${e.target.scrollHeight}px`
    }
    const label = e.target.previousSibling
    const value = e.target.value
    if (value) {
      label.classList.add("active")
    } else {
      label.classList.remove("active")
    }
  }

  return (
    <FormWrapper>
      <Formik
        initialValues={{
          name: "",
          email: "",
          msg: "",
        }}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, setSubmitting, resetForm)
        }}
      >
        {({ isSubmitting, handleChange }) => (
          <Form
            method="post"
            name="contact"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />

            <FieldWrapper>
              <label htmlFor="name">name</label>
              <Field
                type="text"
                name="name"
                className="input"
                onChange={e => {
                  handleChange(e)
                  animate(e)
                }}
              />
              <div className="error">
                <ErrorMessage name="name" />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <label htmlFor="email">email</label>
              <Field
                type="email"
                name="email"
                className="input"
                onChange={e => {
                  handleChange(e)
                  animate(e)
                }}
              />
              <div className="error">
                <ErrorMessage name="email" />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <label htmlFor="name">message</label>
              <Field
                name="msg"
                component="textarea"
                rows="1"
                className="input"
                onChange={e => {
                  handleChange(e)
                  animate(e)
                }}
              />
            </FieldWrapper>

            <ButtonWrapper>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
      {/* {error && (
        <SubmitError>Something went wrong. Please try again!</SubmitError>
      )} */}
    </FormWrapper>
  )
}

export default ContactForm
