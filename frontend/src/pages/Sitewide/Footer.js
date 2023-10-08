import React from 'react'
import Intentful from './../Images/Intentful.png'
import { useNavigate } from "react-router-dom";

export default function Footer() {

    const navigate = useNavigate;

    const onClickImg = (e) =>{
        navigate("/")
    }

    const onClickPrivacy = (e) =>{
        navigate("/privacy")
    }

    return (
        <div className='nav foot page'>
            <div className="footer-text">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            © BulkBuy, Inc. 2023. All rights reserved. Use of
            this site constitutes acceptance of our User Agreement and Privacy Policy and Cookie Statement.<br></br> 
            The Techy Blinders may earn a portion of sales from
            products that are purchased through our site as part of our
            Affiliate Partnerships with retailers.<br></br> 
            The material on this site
            may not be reproduced, distributed, transmitted, cached or
            otherwise used, except with the prior written permission of The
            Techy Blinders.
            </div>
        </div>
    )
}