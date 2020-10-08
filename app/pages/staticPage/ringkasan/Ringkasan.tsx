import React from 'react'
import Card from 'components/deskstop/Card/Card'

const Ringkasan = props => {
    return (
        <Card transparent>
            <div className="white__card__custom">
                Total Data
            </div>
            <div className="white__card__custom">
                Sebaran Domisili
            </div>
            <div className="white__card__custom">
                Sebaran Usia
            </div>
            <div className="white__card__custom">
                Laki-laki : Perempuan
            </div>
        </Card>
    )
}

export default Ringkasan
