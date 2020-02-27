import React from "react"
import styled from "styled-components"
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
    ${device.small`margin-left: auto; margin-top: 2rem;`}
  }
`

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const SubscribeForm = () => {
  function handleSubmit(e) {
    // fetch("/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: encode({
    //     "form-name": "contact",
    //     ...values,
    //   }),
    // })
    //   .then(() => {
    //     resetForm()
    //     console.log("submitted")
    //   })
    //   .catch(() => {
    //     setError(true)
    //     console.log("error")
    //   })
  }

  return (
    <Form
      method="post"
      name="subscribe"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="subscribe" />
      <input
        type="email"
        name="email"
        placeholder="your email address"
        required
      />
      <button>Subscribe</button>
    </Form>
  )
}

export default SubscribeForm
