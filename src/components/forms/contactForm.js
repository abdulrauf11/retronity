import React, { useState } from "react"
import styled from "styled-components"
import device from "../device"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useStaticKit } from "@statickit/react"
import { sendContactEmail } from "@statickit/functions"
import { SwitchTransition, Transition } from "react-transition-group"

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
  button {
    transition: all 0.8s;
    &:hover {
      box-shadow: inset 0 0 0px 30px var(--purple);
    }
  }
`

const Message = styled.div`
  width: 65%;
  max-width: 1000px;
  margin: 4rem 0;
  ${device.small`width: 100%;`}
  ${device.large`margin: 8rem 0;`}
  .text {
    font-size: 6rem;
    font-family: "Gilroy Bold";
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: var(--white);
    line-height: 1;
    ${device.small`font-size: 3rem;`}
    ${device.large`font-size: 8rem;`}
  }
`

const FadeDiv = styled.div`
  transition: 0.5s;
  opacity: ${({ state }) => (state === "entered" ? 1 : 0)};
  display: ${({ state }) => (state === "exited" ? "none" : "block")};
`

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("required field"),
  email: Yup.string()
    .email("invalid email")
    .required("required field"),
  msg: Yup.string().required("required field"),
})

const FadeTransition = ({ children, ...rest }) => (
  <Transition {...rest}>
    {state => <FadeDiv state={state}>{children}</FadeDiv>}
  </Transition>
)

const ContactForm = () => {
  const client = useStaticKit()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState([])

  async function handleSubmit(values, setSubmitting) {
    let resp = await sendContactEmail(client, {
      subject: `Retronity - contact form submitted by <${values.email}>`,
      replyTo: values.email,
      fields: { name: values.name, email: values.email, msg: values.msg },
    })
    switch (resp.status) {
      case "ok":
        setIsSubmitted(true)
        setSubmitting(false)
        break
      case "argumentError":
        setErrors(resp.errors)
        setSubmitting(false)
        break
      default:
        setSubmitting(false)
    }
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
    <>
      <SwitchTransition mode="out-in">
        <FadeTransition
          key={isSubmitted || errors.length ? "message" : "form"}
          timeout={250}
          unmountOnExit
          mountOnEnter
        >
          {isSubmitted || errors.length ? (
            <Message>
              <div className="text">
                {errors.length
                  ? "sorry! something went wrong."
                  : "schweet! we'll get back to you asap."}
              </div>
            </Message>
          ) : (
            <FormWrapper>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  msg: "",
                }}
                validationSchema={Schema}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values, setSubmitting)
                }}
              >
                {({ isSubmitting, handleChange }) => (
                  <Form method="post" name="contact">
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
                      <div className="error">
                        <ErrorMessage name="msg" />
                      </div>
                    </FieldWrapper>

                    <ButtonWrapper>
                      <button type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </ButtonWrapper>
                  </Form>
                )}
              </Formik>
            </FormWrapper>
          )}
        </FadeTransition>
      </SwitchTransition>
    </>
  )
}

export default ContactForm
