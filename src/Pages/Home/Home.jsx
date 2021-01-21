import {useHistory} from 'react-router-dom';
const Home = () => {
    const history = useHistory();
    const handleSubmit = () => {
        //alert("clicked");
history.push("/dashboard");
          }
    return(
        <div>
            <div className="header">
Try it free 7 days than $20/mo.thereafter
      </div>
            <div>
       <form onSubmit={handleSubmit}>
       <input type="text" placeholder="First Name" required/>
       <input type="text" placeholder="Last Name" required/>
       <input type="email" placeholder="Email Address" required/>
       <input type="password" placeholder="password" required/>
       <button className="myButton">CLAIM YOUR FREE TRIAL</button>
     </form>
    </div>
        </div>
    );
}
export default Home;