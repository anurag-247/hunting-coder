import React, { useState } from 'react'
import styles from '@/styles/Home.module.css'



const Contact = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [desc, setdesc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(name, email, phone, desc)

    const data = { name, email, phone, desc };

    fetch('http://localhost:3000/api/postcontact', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert("Thanks for contacting us")
        setname('')
        setemail('')
        setphone('')
        setdesc('')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    

  }
  const handleChange = (e) => {
    if(e.target.name == 'name'){
       setname(e.target.value)
     }
    else if(e.target.name == 'email'){
       setemail(e.target.value)
     }
    else if(e.target.name == 'phone'){
      setphone(e.target.value)
    }
    else if(e.target.name == 'desc'){
      setdesc(e.target.value)
    }
  }

  return (<>

    <div className={styles.container}>
      <h1>Contact</h1>

      {/* form start */}

      <form onSubmit={handleSubmit}>

        {/* form name field start */}

        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formlabel}>Enter your name</label>
          <input type="text" value={name} onChange={handleChange} className="form-control" name='name' id="name" />
        </div>

        {/* form email field start */}

        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formlabel}>Email address</label>
          <input type="email" value={email} onChange={handleChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        {/* form phone feild start */}

        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formlabel}>Phone number</label>
          <input type="phone" name='phone' value={phone} onChange={handleChange} className="form-control" id="phone" required />
        </div>

        {/* form concern field start */}

        <div>
          <label htmlFor="floatingTextarea" className={styles.formlabel}>Elaborate your concern</label>
          <textarea className={styles.formControl} value={desc} onChange={handleChange} name='desc' placeholder='leave a comment' id='floatingTextarea'></textarea>
        </div>

        {/* form submit button */}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {/* form end */}

    </div>
  </>
  )
}



export default Contact