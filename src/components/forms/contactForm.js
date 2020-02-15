import React from "react"
import styled from "styled-components"
// import { Formik, Field, Form, ErrorMessage } from "formik"
// import * as Yup from "yup"

const Form = styled.form`
  max-width: 600px;
  margin: 8rem 0;
`

const FieldWrapper = styled.div`
  margin-top: 6rem;
  position: relative;
  line-height: 1.2;
  label {
    z-index: -1;
    position: absolute;
    top: 0;
    transform-origin: left top;
    transition: all 0.25s cubic-bezier(0, 0, 0.25, 1);
    font-family: "Gilroy Bold";
    font-size: 6rem;
    -webkit-text-fill-color: var(--black);
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: var(--white);
    opacity: 0.2;
    &.active {
      transform: scale(0.3) translateY(-100%);
      -webkit-text-fill-color: var(--white);
      -webkit-text-stroke-width: 0;
    }
  }
  .input {
    color: var(--white);
    width: 100%;
    font-size: 6rem;
    display: block;
    border: 0;
    border-bottom: 1px solid var(--white);
    background: transparent;
  }

  textarea.scroll {
    font-size: 3rem;
  }

  .error {
    font-size: 0.8rem;
    margin: 0.5rem 0;
    position: absolute;
    color: #932422;
  }
`

const ButtonWrapper = styled.div`
  margin: 4rem 0;
  text-align: right;
`

// const Schema = Yup.object().shape({
//   name: Yup.string()
//     .min(3, "Too Short!")
//     .max(50, "Too Long!")
//     .required("required field"),
//   email: Yup.string()
//     .email("invalid email")
//     .required("required field"),
// })

const ContactForm = () => {
  function handleSubmit(e) {
    console.log("submit")
    e.preventDefault()
  }

  function handleChange(e) {
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
    <Form method="post" name="contact" onSubmit={handleSubmit}>
      <FieldWrapper>
        <label htmlFor="name">name</label>
        <input
          type="text"
          name="name"
          className="input"
          onChange={handleChange}
        />
        <div className="error"></div>
      </FieldWrapper>

      <FieldWrapper>
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          className="input"
          onChange={handleChange}
        />
        <div className="error"></div>
      </FieldWrapper>

      <FieldWrapper>
        <label htmlFor="name">message</label>
        <textarea
          name="msg"
          className="input"
          onChange={handleChange}
          rows="1"
          columns="1"
        />
      </FieldWrapper>

      <ButtonWrapper>
        <button type="submit">Submit</button>
      </ButtonWrapper>
    </Form>
  )
}

export default ContactForm
