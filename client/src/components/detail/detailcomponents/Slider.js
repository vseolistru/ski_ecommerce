import React from 'react';
import {Carousel} from "react-carousel-minimal";

const Slider = ({data}) => {

    const captionStyle = {
        fontSize: '1.4em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }
    return (
        <Carousel
            data={data}
            time={9000}
            width="850px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="white"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
                textAlign: "center",
                maxWidth: "850px",
                maxHeight: "500px",
                marginLeft: "10px",
            }}
        />
    );
};

export default Slider;