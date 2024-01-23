import Input from "@/app/ui/Input"
import Button from "@/app/ui/Button"

export default function Page() {
return( 
    <>
<h2 className="m-2">Create Account</h2>
<Input placeholder="Username"/>
<Input placeholder="Email"/>
<Input placeholder="Password"/>
<Input placeholder="Confirm Password"/>
<Button >
    
</Button>
<a className="text-sm ml-5" href="/login-page">Back to login</a>
</>


)}