import Input from "../ui/Input"
import Button from "../ui/Button"

export default function Page() {
   
return( 
    <>
<h2 className="m-2">Login</h2>
<Input placeholder="Username" />
<Input placeholder="Password" />
<Button >
</Button>
<a className="text-sm ml-5" href="/login-page/Create-account">Not a member?</a>
</>


)}
