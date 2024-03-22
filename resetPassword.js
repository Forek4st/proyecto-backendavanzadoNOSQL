/* eslint-disable no-undef */
const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.querySelector('#email').value

  try {
    const response = await fetch('http://localhost:3500/auth/reset-password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    const data = await response.json()

    if (data.msg === `An email has been sent to ${email} with further instructions.`) {
      alert(data.msg)
      window.location.href = '/'
    } else {
      alert(data.msg)
    }
  } catch (error) {
    console.error(error)
    alert('Error resetting password')
  }
})
