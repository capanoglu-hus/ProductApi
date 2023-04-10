import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [userName, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');
   
    const [tokenjwt, settokenjwt] = useState('');
    const history = useHistory();

    useEffect(()=>{
sessionStorage.clear();
    },[]);

   
    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("11");
            let inputobj={"username": userName,
            "password": password,
            "tokenjwt": tokenjwt}
            fetch("https://localhost:7264/api/User/login",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
                
            }).then(resp  => {
               
                console.log(resp)
                console.log("11");
                     toast.success('Success');
                     sessionStorage.setItem('username',userName);
                     sessionStorage.setItem('tokenjwt',resp.tokenjwt);
                     history.push("/UserHeader");
                
                    
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (userName === '' || userName === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={userName} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> |
                            <Link className="btn btn-success" to={'/Register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

