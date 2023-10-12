import React from 'react'
import handler from './api/hello'

export default function Practice() {
  return (
    <>
    <form onSubmit={handleSubmit}>
 
 
    <label>email:</label>
    <input type="email" name="email" /><br/>
    <label>password:</label>
    <input type="password" name="password" /><br/>
 
  <input type="submit" value="Submit" />
</form>
    </>
  )
}
