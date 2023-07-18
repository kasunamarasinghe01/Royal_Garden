

import {useState, useRef} from 'react'
import {Form, FloatingLabel, Spinner} from 'react-bootstrap';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {MdAddAPhoto, MdDeleteForever} from 'react-icons/md';
import {toast} from 'react-toastify';
import {storage} from '../config/firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import axiosPublic from '../config/axios';

import '../styles/register.css';
import useAuthContext from '../hooks/useAuthContext';

function RegisterScreen() {

    const {auth} = useAuthContext();


    const navigate = useNavigate();

    const avatarInputRef = useRef();


    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState(null);
    const [avatar, setAvatar] = useState(null);

    // form fields state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');

    const handleAvatarSelect = e => {
        const file = e.target.files[0];

        if(file) {
            // use file reader and convert the file into a data url
            const reader = new FileReader();
            reader.onload = () => {
                setFile(file);
                setAvatar(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const handleAvatarRemove = () => {
        setFile(null);
        setAvatar(null);
    }

    const handleRegister = async () => {

        setLoading(true);

        if (
            !username ||
            !password ||
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !address ||
            !street ||
            !city ||
            !gender
            ) {
                toast.error("All fields are requried");
                setLoading(false);
                return;
            }

        if(password.trim() !== confirmPassword.trim()) {
            // display error message saying that passwords aren't match
            toast.error('passwords do not match');
            setLoading(false);
            return;
        }

        const customer = {
            username,
            password,
            firstName,
            lastName,
            email,
            phoneNumber: phone,
            address,
            street,
            city,
            gender,
            avatar: null
        }

        // if an avatar has been selected, upload it to firebase & get the url
        let url = null;
        if(file && avatar) {
            // upload image to firebase
            const imageRef = ref(storage, `/avatar/${uuidv4()}`);

            try {
                const snapshot = await uploadBytes(imageRef, file);
                url = await getDownloadURL(snapshot.ref);
                customer.avatar = url;
            } catch(err) {
                console.log(err);
            }

        }

        try {
            const response = await axiosPublic.post('/auth/register', JSON.stringify(customer));
            setLoading(false);
            toast.success('Registered successfully');
            navigate('/login/user');
        } catch (err) {
            console.log(err); // err.response.data.message
            toast.error(err.response.data.message);
            setLoading(false);
        }

        

        console.log(customer);
    }

    if(auth.isAuthenticated && auth.user && auth.token) {
        return <Navigate to='/home' />
    }


  return (
    <div className="registerPage bs -mt-2 md-10">
            <div className='registerPage-content-wrapper'>
                <h2 className='registerPage-title' style={{textAlign:'center'}}>Register as Customer</h2>
                <hr></hr>
                <div className='registerPage-content'>

                    {/* <span className='registerPage-content-vertical-line'></span> */}

                    <div className='registerPage-content-left'>

                        <div className='registerPage-content-left-avatar'>
                            <div>
                                {!avatar && !file && <span>No Avatar</span>}
                                {file && avatar && <img src={avatar} alt='avatar' />}
                            </div>
                            <p>
                                <input type='file' accept='image/jpeg' ref={avatarInputRef} onChange={handleAvatarSelect} />
                                <button title='add avatar' onClick={() => avatarInputRef.current?.click()}><MdAddAPhoto /></button>
                                {file && avatar && <button title='remove avatar' onClick={handleAvatarRemove}><MdDeleteForever /></button>}
                            </p>
                            
                        </div>

                        <FloatingLabel controlId="username" label="Username" className='mb-4'>
                            <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Password" className='mb-4'>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </FloatingLabel>

                        <FloatingLabel controlId="confirmPassword" label="Confirm Password" className='mb-4'>
                            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </FloatingLabel>

                    </div>

                    <div className='registerPage-content-right'>
                        
                        <div className='d-flex align-items-center gap-2'>
                            <FloatingLabel controlId="First Name" label="First Name" className='mb-4'>
                                <Form.Control type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="Last Name" label="Last Name" className='mb-4'>
                                <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                            </FloatingLabel>
                        </div>

                        <FloatingLabel controlId="Email" label="Email" className='mb-4'>
                                <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </FloatingLabel>

                        <FloatingLabel controlId="Phone No." label="Phone" className='mb-4'>
                                <Form.Control type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                        </FloatingLabel>

                        <FloatingLabel controlId="Address" label="Address" className='mb-4'>
                                <Form.Control type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
                        </FloatingLabel>

                        <div className='d-flex align-items-center gap-2'>
                            <FloatingLabel controlId="Street" label="Street" className='mb-4'>
                                <Form.Control type="text" placeholder="Street" value={street} onChange={e => setStreet(e.target.value)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="City" label="City" className='mb-4'>
                                <Form.Control type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                            </FloatingLabel>
                        </div>

                        <div className='px-3 py-2 border rounded'>
                            <label className='mb-2'>Gender</label>
                            <div className='d-flex align-items-center gap-4'>
                                <Form.Check
                                    type='radio'
                                    label='Male'
                                    value='male'
                                    name='gender'
                                    onChange={e => setGender(e.target.value)}
                                />
                                <Form.Check
                                    type='radio'
                                    label='Female'
                                    value='female'
                                    name='gender'
                                    onChange={e => setGender(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>

                </div>
                <hr></hr>
                <div className='mt-2 d-flex align-items-center gap-3'>
                    <button className='btn btn-dark px-5 py-2 d-flex align-items-center gap-2' disabled={loading} onClick={handleRegister} >{loading ? (<><Spinner animation="border" size='sm' /> wait...</>) : 'Register'}</button>
                    <p className='registerPage-btn-para'>You already have an account ? <Link to='/login/user'>Sign In</Link></p>
                </div>
            </div>
        </div>
  )
}

export default RegisterScreen
