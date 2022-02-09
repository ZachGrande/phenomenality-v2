import seattle from "./assets/seattle.jpg"

const styles = {
  header: {
    backgroundImage: `url(${seattle})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  
  content: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
}

function LandingPage() {
  return(
    <div style={styles.header}>
      <div style={styles.content}>
        Portfolio
      </div>
    </div>
    // <div style={{backgroundImage: `url(${seattle})`}}>
    //   <p>Hello, world!</p>
    // </div>
    )
  }
  
  export default LandingPage;