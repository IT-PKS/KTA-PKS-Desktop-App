import React from 'react'
// import './LicenseKey.scss'
import { useForm } from 'react-hook-form'
type Inputs = {
    example: string,
    exampleRequired: string,
};
const LicenseKey = () => {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const onSubmit = (data: object) => console.log(data);


    return (
        <div className="LicenseKey" style={styleLicenseKey}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="licenseKey" ref={register} />
                <button type="submit" >kirim</button>
            </form>
        </div>
    )
}

const styleLicenseKey = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }

export default LicenseKey
