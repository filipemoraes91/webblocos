import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../context/themeContext";

import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { AccountCircle } from "@mui/icons-material";
import PasswordIcon from "@mui/icons-material/Password";
import useToken from "../../hooks/useToken";
import { ContainerBase } from "../../components/container";
import { getStyles } from "./style";
import { TextFieldIcon } from "../../components/inputs/textfield";

export function Login() {
  const { theme, isMobile } = useThemeContext();
  const styles = getStyles(theme, isMobile);
  // const { getToken } = useToken();
  const [data, setData] = useState({
    usuario: "",
    senha: "",
  });

  useEffect(() => {
    sessionStorage.clear("");
    // eslint-disable-next-line
  }, []);

  function handleData(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function submit(e) {
    // e.preventDefault();
    // getToken(data);
  }

  return (
    <ContainerBase>
      <div style={styles.login}>
        <div style={{ marginBottom: "20px" }}>
          <img src="../../../assets/logo.png" height={100} />
        </div>
        <h5 style={styles.title}>
          Bem-vindo à <span style={{ color: "#329cfd" }}>Web Blocos</span>
        </h5>
        {/* <form onSubmit={(e) => submit(e)}> */}
          <TextFieldIcon
            label="Usuário"
            name="usuario"
            type="text"
            autoFocus
            onChange={handleData}
            icon={<AccountCircle style={{ marginRight: "10px" }} />}
          />
          <br />
          <br />
          <TextFieldIcon
            label="Senha"
            name="senha"
            type="password"
            onChange={handleData}
            icon={<PasswordIcon style={{ marginRight: "10px" }} />}
          />
          <br />
          <br />
          <Button
            variant="contained"
            sx={{background: '#329cfd'}}
            startIcon={<LoginIcon />}
            fullWidth
            // type="submit"
            onClick={() => {window.location.href = '/home'}}
          >
            Login
          </Button>
        {/* </form> */}
      </div>
    </ContainerBase>
  );
}

export default Login;
