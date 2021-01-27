import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flex,
  Box,
  Heading,
  Spacer,
  Button,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";

import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { setCookie, parseCookies } from "nookies";

import Share from "../Share";

function Nav() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [user, setUser] = useState({
    name: "",
    profileUrl: "",
    isSignedIn: false,
  });

  useEffect(() => {
    const user = parseCookies().user;
    if (user) {
      setUser({ ...JSON.parse(user), isSignedIn: true });
    }
  }, []);

  const responseGoogle = (response) => {
    if (!response.error && response.profileObj) {
      const { name, imageUrl } = response.profileObj;
      setCookie(
        null,
        "user",
        JSON.stringify({
          name,
          profileUrl: imageUrl,
          isSignedIn: user.isSignedIn,
        }),
        {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        }
      );
      setUser({ name, profileUrl: imageUrl, isSignedIn: true });
    }
  };

  return (
    <Flex borderBottom="1px solid #eee" py="4">
      <Box p="2">
        <Heading size="md">
          <Link href="/">BookQuote</Link>
        </Heading>
      </Box>
      <Spacer />
      <Flex align="center" justifyContent="space-around">
        <Box mr={4}>
          <Link href="/app">Home</Link>
        </Box>
        <Box mr={4}>
          {user && user.isSignedIn ? (
            <Link href="/app/me">
              <Avatar
                cursor="pointer"
                size="sm"
                name={user.name}
                src={user.profileUrl}
              />
            </Link>
          ) : (
            <GoogleLogin
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  size="sm"
                  colorScheme="gray"
                  leftIcon={<FcGoogle />}
                >
                  Sign In
                </Button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </Box>
        <Box>
          <Button size="sm" colorScheme="messenger" onClick={() => onOpen()}>
            Share
          </Button>
        </Box>
      </Flex>
      <Share isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default Nav;
