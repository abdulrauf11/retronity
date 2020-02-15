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
    &::placeholder {
      color: var(--white);
      opacity: 0.2;
    }
  }
  button {
    margin-left: 1.5rem;
    ${device.small`margin-left: auto; margin-top: 1rem;`}
  }
`

const SubscribeForm = () => {
  function handleSubmit(e) {
    e.preventDefault()
    console.log("submit")
  }

  function handleChange(e) {
    console.log("changing")
  }

  return (
    <Form method="post" name="subscribe" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="your email address"
        onChange={handleChange}
      />
      <button>Subscribe</button>
    </Form>
  )
}

export default SubscribeForm
