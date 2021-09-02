import React, { useState, useEffect } from "react"
import Seo from "components/Seo"
import Confetti from 'react-confetti'

export default function Home ()
{

  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ colour, setColour ] = useState( '' )
  const [ animal, setAnimal ] = useState( [] )
  const [ tigerType, setTigerType ] = useState( [ '' ] )
  const [ processing, setProcessing ] = useState( false )
  const [ success, setSuccess ] = useState( '' )
  const [ error, setError ] = useState( false )
  let isValid = true

  //Select Control
  const handleSelect = ( e ) =>
  {
    e.preventDefault()
    setColour( e.target.value )
  }

  const validation = () =>
  {
    console.log( { email, password, colour, animal, tigerType } )

    if ( email == "" ) { isValid = false }
    if ( colour == "" ) { isValid = false }
    if ( password.length < 8 ) { isValid = false }
    console.log( animal )
    if ( animal.length < 2 ) { isValid = false; }
    if ( animal.includes( 'tiger' ) && tigerType == "" ) { isValid = false; }
    return isValid
  }

  //Form Submission
  const onSubmit = ( e ) =>
  {
    e.preventDefault();

    setProcessing( true );

    const checkValidation = validation()
    if ( checkValidation )
    {
      setError( false )
      setProcessing( false )
      setSuccess( true )
      console.log( 'form submited', { email, password, colour, animal, tigerType } )

      //Extra code just for this specific app for cleanup
      e.target.reset()
      setEmail( '' )
      setPassword( '' )
      setAnimal( '' )
      setColour( '' )
      setTigerType( '' )
    }

    if ( !checkValidation )
    {
      console.log( 'not valid' )
      setError( true )
      setProcessing( false )
    }
    //Extra code, just to cleanup the state
    setTimeout( function () { setError( false ); setSuccess( false ) }, 8000 )
  }

  return (
    <>
      <Seo title="Form validation problem" description="Converting plain html to jsx" />

      {/* FORM BEGINS */}
      <form onSubmit={onSubmit}>

        <h1>Fill out this awesome form</h1>

        <fieldset>
          <h3>Your details</h3>
          <p className={error && email == "" ? 'error' : ''}>
            <label className='label' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={( e ) => setEmail( e.target.value )}
              id='email'
              name='email'
            />
          </p>

          <p className={error && ( password == "" || password.length < 8 ) ? 'error' : ''}>
            <label className='label' htmlFor='password'>
              Password
            </label>
            <input
              className=''
              value={password}
              onChange={( e ) => setPassword( e.target.value )}
              type='password'
              id='password'
              name='username'
              minLength="8"
            />
          </p>
        </fieldset>

        <fieldset>
          <h3>Your animal</h3>

          <p className={error && colour == "" ? 'error' : ''}>
            <label className='label' htmlFor='colour'>
              Colour
            </label>
            <select name='colour' id='colour' onChange={handleSelect} value={colour}>
              <option value=''>Choose colour</option>
              <option value='blue'>Blue</option>
              <option value='green'>Green</option>
              <option value='red'>Red</option>
              <option value='black'>Black</option>
              <option value='brown'>Brown</option>
            </select>
          </p>

          <p>
            <span className={`label ${ error && animal.length < 2 ? 'error' : '' }`}>
              Animal
            </span>

            <input
              type='checkbox'
              name='animal'
              value='bear'
              id='bear'
              onChange={( e ) => setAnimal( [ ...animal, e.target.value ] )} />
            <label htmlFor='bear'>
              Bear
            </label>

            <input
              type='checkbox'
              name='animal'
              value='tiger'
              id='tiger'
              onChange={( e ) => setAnimal( [ ...animal, e.target.value ] )} />
            <label htmlFor='tiger'>
              Tiger
            </label>

            <input
              type='checkbox'
              name='animal'
              value='snake'
              id='snake'
              onChange={( e ) => setAnimal( [ ...animal, e.target.value ] )} />
            <label htmlFor='snake'>
              Snake
            </label>

            <input
              type='checkbox'
              name='animal'
              value='donkey'
              id='donkey'
              onChange={( e ) => setAnimal( [ ...animal, e.target.value ] )} />
            <label htmlFor='donkey'>
              Donkey
            </label>
          </p>

          <p className={error && animal.includes( 'tiger' ) && tigerType == "" ? 'error' : ''}>
            <label className='label' htmlFor='tiger_type'>
              Type of tiger
            </label>
            <input
              type='text'
              name='tiger_type'
              id='tiger_type'
              value={tigerType}
              onChange={( e ) => setTigerType( e.target.value )}
            // required={animal.includes( 'tiger' ) ? true : false}
            />
          </p>
        </fieldset>

        <fieldset>
          <p>
            <button
              className="submit"
              type='submit'>
              {processing ? 'Submitting' : 'Create account'}
            </button>
            {error && <span className="errorMsg">Please fill out the required fields.</span>}
            {success &&
              <>
                <span className="successMsg">Yay!! your form is successfully submitted.</span>
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                />
              </>}
          </p>
        </fieldset>

      </form>
      {/* FORM ENDS */}
    </>
  )
}
