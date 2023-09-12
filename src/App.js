import { useState, useEffect, useRef, useCallback } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from '@mui/system';
import bgimg from "./assets/bgimg.jpeg";

const Component = styled('Box')({
  color: 'lightblue',
  font: 'message-box',
  padding: 16,
  borderRadius: 8,
  textAlign: "center",
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Pacifico, cursive',
  margin: 'auto',
});

const CopyButton = styled(Button)({
  marginLeft: 1,
  backgroundColor: 'green',
  '&:hover': {
    backgroundColor: 'blue',
  },
  color: '#fff',
  width: "30px"
});

const NewButton = styled(Button)({
  '&:hover': {
    backgroundColor: 'blue',
  },
});

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let passwd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*+-?";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length);
      passwd += str.charAt(index);
    }

    setPassword(passwd);
    setCopied(false);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div style={{ 
      backgroundImage: `url(${bgimg})`, 
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Component>
        <h1>PasswordGenerator</h1>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{
                border: '1px solid #ccc',
                padding: '8px',
                borderRadius: '8px',
                color: copied ? 'green' : 'white',
                backgroundColor:"black",
                minHeight: '60px', // Set a minimum height for the textarea
                resize: 'vertical', // Allow vertical resizing
                width: '100%', // Take up full width
                boxSizing: 'border-box', // Include padding and border in width
              }}
            >
              {password}
            </Typography>
          </Grid>
          <Grid item>
            <CopyButton
              variant="contained"
              onClick={copyPasswordToClipboard}
              sx={{
                borderRadius: '8px',
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </CopyButton>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Box mb={2}>
            <Grid>
                <NewButton 
                  variant="contained"
                  onClick={passwordGenerator}
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  New Password
                </NewButton>
            </Grid>
          </Box>
        </Box>
        <Box mt={2}>
          <Box mb={2}>
            <input
              type="range"
              min={6}
              max={66}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </Box>
          <Box mb={2}>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </Box>
          <Box>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput">Special Characters</label>
          </Box>
        </Box>
      </Component>
    </div>
  );
}

export default App;



// import { useState, useEffect, useRef, useCallback } from "react";
// import { Box, Button, Grid, Typography } from "@mui/material";
// import { styled } from '@mui/system';
// import bgimg from "./assets/bgimg.jpeg";


// const Component = styled('Box')({
//   color: 'lightblue',
//   font: 'message-box',
//   backgroundColor: 'white', // Light blue background color
//   padding: 16, // Increase padding for more space
//   borderRadius: 8, // Rounder corners
//   textAlign: "center",
//   boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',// Add a subtle shadow for depth
//   fontFamily: 'Pacifico, cursive',
// });

// const CopyButton = styled(Button)({
//   marginLeft: 1,
//   backgroundColor: 'green', // Green background color
//   '&:hover': {
//     backgroundColor: 'blue', // Blue on hover
//   },
//   color: '#fff',// White text color
//   width: "30px"
// });

// function App() {

//   const [length, setLength] = useState(8);
//   const [numberAllowed, setNumberAllowed] = useState(false);
//   const [charAllowed, setCharAllowed] = useState(false);
//   const [password, setPassword] = useState("");
//   const [copied, setCopied] = useState(false);
//   const passwordRef = useRef(null)


//   const passwordGenerator = useCallback(() => {
//     let passwd = "";
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz";
//     if (numberAllowed) str += "0123456789";
//     if (charAllowed) str += "!@#$%^&*+-?";

//     for (let i = 1; i <= length; i++) {
//       let index = Math.floor(Math.random() * str.length);
//       passwd += str.charAt(index);
//     }

//     setPassword(passwd);
//     setCopied(false); // Reset the copied state
//   }, [length, numberAllowed, charAllowed, setPassword])

//   const copyPasswordToClipboard = useCallback(() => {
//     passwordRef.current?.select();
//     passwordRef.current?.setSelectionRange(0, password.length);
//     window.navigator.clipboard.writeText(password)// Copy to clipboard
//     setCopied(true); // Set the copied state to true
//   }, [password])

//   useEffect(() => {
//     passwordGenerator();
//   }, [length, numberAllowed, charAllowed, passwordGenerator]);

//   return (
//     <div style={{ 
//       backgroundImage: `url(${bgimg})`, 
//       backgroundSize: 'cover',
//       backgroundRepeat: 'no-repeat',
//       height: '97vh',
//     }}>
//     <Component>
//       <h1>PasswordGenerator</h1>
//       <Grid container spacing={2} alignItems="center" justifyContent="center">
//         <Grid item xs={6}>
//           <Typography
//             variant="body1"
//             sx={{
//               border: '1px solid #ccc',
//               padding: '8px',
//               borderRadius: '8px',
//               color: copied ? 'green' : 'white', // Change text color to green if copied
//               backgroundColor:"black"
//             }}
//           >
//             {password}
//           </Typography>
//         </Grid>
//         <Grid item>
//           <CopyButton
//             variant="contained"
//             onClick={copyPasswordToClipboard}
//             sx={{
//               borderRadius: '8px',
//             }}
//           >
//             {copied ? 'Copied' : 'Copy'}
//           </CopyButton>
//         </Grid>
//       </Grid>
//       <Box mt={2}> {/* Add margin top */}
//         <Box mb={2}> {/* Add margin bottom */}
//           <input
//             type="range"
//             min={6}
//             max={66}
//             value={length}
//             className='cursor-pointer'
//             onChange={(e) => { setLength(e.target.value) }}
//           />
//           <label>Length: {length}</label>
//         </Box>
//         <Box mb={2}>
//           <input
//             type="checkbox"
//             defaultChecked={numberAllowed}
//             id="numberInput"
//             onChange={() => {
//               setNumberAllowed((prev) => !prev);
//             }}
//           />
//           <label htmlFor="numberInput">Numbers</label>
//         </Box>
//         <Box>
//           <input
//             type="checkbox"
//             defaultChecked={charAllowed}
//             id="characterInput"
//             onChange={() => {
//               setCharAllowed((prev) => !prev)
//             }}
//           />
//           <label htmlFor="characterInput">Special Characters</label>
//         </Box>
//       </Box>
//     </Component>
//     </div>
//   );
// }

// export default App;
