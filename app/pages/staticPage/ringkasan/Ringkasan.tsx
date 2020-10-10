import React from 'react'
import Card from 'components/deskstop/Card/Card'

const Ringkasan = props => {
    return (
        <Card transparent>
            <div className="white__card__custom">
                <h1>Total Data</h1>
                <p>123.353.243</p>
                <p>KTA se-Indonesia</p>
            </div>
            <div className="white__card__custom">
                <h1>Sebaran Domisili</h1>
                <div>
                    <p>{`<30`}</p>
                    <p>4.738.035</p>
                </div>
            </div>
            <div className="white__card__custom">
                <h1>Sebaran Usia</h1>
                <div>
                    <p>DKI Jakarta</p>
                    <p>12.603.549</p>
                </div>
            </div>
            <div className="white__card__custom">
                <h1>Laki-laki : Perempuan</h1>
                <div>
                    <p>71.021.173</p>
                    <p>Laki-laki</p>
                </div>
            </div>
        </Card>
    )
}

export default Ringkasan
