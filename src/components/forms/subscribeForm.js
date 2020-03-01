import React, { useState } from "react"
import styled from "styled-components"
import { useStaticKit } from "@statickit/react"
import { addToMailchimp } from "@statickit/functions"
import { SwitchTransition, Transition } from "react-transition-group"
import device from "../device"

const Form = styled.form`
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  input {
    color: var(--white);
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--pink);
    padding: 0.5rem 0.5rem;
    width: 100%;
    width: 300px;
    ${device.small`width: 100%;`}
    &::placeholder {
      color: var(--white);
      opacity: 0.2;
    }
  }
  button {
    margin-left: 1.5rem;
    transition: all 0.8s;
    ${device.small`margin-left: auto; margin-top: 2rem;`}
    &:hover {
      box-shadow: inset 0 0 0px 30px var(--purple);
    }
  }
`

const Message = styled.div`
  align-items: flex-start;
  border-bottom: 1px solid var(--pink);
  .text {
    line-height: 1.6;
    font-size: 2rem;
    font-family: "Gilroy Bold";
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: var(--white);
    ${device.small`font-size: 1.5rem;`}
    ${device.large`font-size: 3rem;`}
  }
`

const FadeDiv = styled.div`
  transition: 0.5s;
  opacity: ${({ state }) => (state === "entered" ? 1 : 0)};
  display: ${({ state }) => (state === "exited" ? "none" : "block")};
`

const FadeTransition = ({ children, ...rest }) => (
  <Transition {...rest}>
    {state => <FadeDiv state={state}>{children}</FadeDiv>}
  </Transition>
)

const SubscribeForm = () => {
  const [emailAddress, setEmailAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState([])

  const client = useStaticKit()

  const handleSubmit = async e => {
    e.preventDefault()
    setErrors([])
    setIsSubmitting(true)
    let resp = await addToMailchimp(client, { emailAddress })
    switch (resp.status) {
      case "ok":
        setIsSubmitted(true)
        setIsSubmitting(false)
        break
      case "argumentError":
        setErrors(resp.errors)
        setIsSubmitting(false)
        break
      default:
        setIsSubmitting(false)
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
                  ? "something went wrong!"
                  : "thank you for subscribing!"}
              </div>
            </Message>
          ) : (
            <Form method="post" name="subscribe" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="your email address"
                onChange={e => setEmailAddress(e.target.value)}
                value={emailAddress}
                required
              />
              <button disabled={isSubmitting}>Subscribe</button>
            </Form>
          )}
        </FadeTransition>
      </SwitchTransition>
    </>
  )
}

export default SubscribeForm
