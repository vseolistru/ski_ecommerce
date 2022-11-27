export const styles = {
    chatWithMeButton: {
        cursor: 'pointer',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        // Border
        borderRadius: '50%',
        // Background
        backgroundImage: `url(./avatar.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '84px',
        marginBottom: "10px",
        // Size
        width: '84px',
        height: '84px',
    },
    avatarHello: {
        // Position
        position: 'absolute',
        right: '14px',
        bottom: '107px',
        // Layering
        zIndex: '10',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        // Border
        padding: '12px 12px 12px 16px',
        borderRadius: '24px',
        // Color
        backgroundColor: 'rgba(61, 39, 39, 0.64)',
        color: '#fff',
        fontWeight:"bold",
        letterSpacing:"2px"

    },
    supportWindow: {
        // Position
        position: 'fixed',
        bottom: '126px',
        right: '24px',
        // Size
        width: '420px',
        height: '530px',
        maxWidth: 'calc(100% - 48px)',
        maxHeight: 'calc(100% - 48px)',
        backgroundColor: 'white',
        // Border
        borderRadius: '12px',
        border: `2px solid rgba(61, 39, 39, 0.64)`,
        overflow: 'hidden',
        // Shadow
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
    },
    emailFormWindow: {
        width: '100%',
        overflow: 'hidden',
        transition: "all 0.5s ease",
        WebkitTransition: "all 0.5s ease",
        MozTransition: "all 0.5s ease",
    },
    stripe: {
        position: 'absolute',
        top: '-45px',
        width: '100%',
        height: '308px',
        backgroundColor: '#3d2727',
        transform: 'skewY(-12deg)',

    },
    topText: {
        position: 'absolute',
        width: '540px',
        height: '40px',
        top: '0px',
        textAlign: 'center',
        color: '#C29254',
        right:'-95px',
        fontSize: '24px',
        fontWeight: '600',
        marginRight: '50px',
        backgroundColor: '#3d2727',
    },
    emailInput: {
        width: '66%',
        textAlign: 'center',
        outline: 'none',
        padding: '12px',
        borderRadius: '12px',
        border: '2px solid #1f4f3b',
        fontSize: '20px'
    },
    bottomText: {
        position: 'absolute',
        width: '100%',
        top: '60%',
        color: '#7a39e0',
        fontSize: '24px',
        fontWeight: '600'
    },
    loadingDiv: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'white',
    },
    loadingIcon: {
        color: '#7a39e0',
        position: 'absolute',
        top: 'calc(50% - 51px)',
        left: 'calc(50% - 51px)',
        fontWeight: '600',
    },
    chatEngineWindow: {
        width: '100%',
        backgroundColor: '#fff',
    },
    supportWindowHidden:
    {
        displayNone: true,
        position: 'fixed',
        top:-500
    }
}