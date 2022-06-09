import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { UidContext } from '../Appcontext'

export default function FormPost() {
    const userData = useSelector((state) => state.userReducer)
    const userId = useContext(UidContext)

    const [message, setMessage] = useState('')
    const [file, setFile] = useState('')

    const handleFileReader = () => {
        const input = document.querySelector('input[type="file"')
        const img = document.querySelector('.receiverImg')
        const reader = new FileReader()
        reader.onload = function () {
            img.src = reader.result
            img.alt = 'photo profil'
            document.querySelector('.imgPost-container').appendChild(img)
        }
        reader.readAsDataURL(input.files[0])
    }

    function handleSubmit() {
        const data = new FormData()
        data.append('message', message)
        data.append('file', file)
        data.append('userId', userId)

        axios({
            method: 'post',
            url: (`${process.env.REACT_APP_API_URL}/api/post`),
            withCredentials: true,
            data
        })
            .then((res) => {

                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    return (<>
        <div className='img-container'>
            <img src={userData.picture} alt="pic profil user" />
        </div>
        <form action="post" onSubmit={handleSubmit}>
            <input type="text" className='text-form' placeholder={`Quoi de neuf ${userData.pseudo}`} onChange={(e) => setMessage(e.target.value)} />
            <div className="btn-container">
                <label htmlFor="file" className='labelFile'>Choisir un fichier</label>
                <input type="file" id='file' placeholder='Ajouter une image' onChange={(e) => {
                    handleFileReader()
                    setFile(e.target.files[0])
                }} className='inputFile' />
                <input type="submit" className='send' />

                {/* <div className="imgPost-container">
                    <img src="" alt="" className='receiverImg' />
                </div> */}

                {
                    file ? <div className="imgPost-container">
                        <img src={file} alt="" className='receiverImg' />
                    </div> : null
                }

            </div>


        </form>



    </>
    )
}
