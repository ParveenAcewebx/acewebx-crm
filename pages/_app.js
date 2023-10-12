import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Analytics } from "@vercel/analytics/react";
import "styles/theme.scss";
import DefaultDashboardLayout from "layouts/DefaultDashboardLayout";
import PrivateRoute from "./components/privateRoute";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = "Dash UI - Next.Js Admin Dashboard Template";
  const description =
    "Dash is a fully responsive and yet modern premium Next.js template & snippets. Geek is feature-rich Next.js components and beautifully designed pages that help you create the best possible website and web application projects. Next.js Snippet";
  const keywords =
    "Dash UI, Next.js, Course, Sass, landing, Marketing, admin themes, Next.js admin, Next.js dashboard, ui kit, web app, multipurpose";

  const Layout =
    Component.Layout ||
    (router.pathname.includes("dashboard")
      ? router.pathname.includes("instructor") ||
        router.pathname.includes("student")
        ? DefaultDashboardLayout
        : DefaultDashboardLayout
      : DefaultDashboardLayout);

  const layoutPage = [
    "/authentication/sign-in",
    "/authentication/sign-up",
    "/authentication/forget-password",
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token && !layoutPage.includes(router.pathname)) {
      // Store the current URL in local storage before redirecting
      localStorage.setItem("redirectPath", router.asPath);
      router.push("/authentication/sign-in");
    } else if (token) {
      // Check if this is a page reload (type 1) or a user-initiated navigation
      if (performance.navigation.type !== 1) {
        // User has logged in and there's a previous URL, so redirect to it
        const redirectPath = localStorage.getItem("redirectPath") || "/";
        router.push(redirectPath);
      }
    }
  }, [router.pathname]);

  return (
    <SSRProvider>
      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: process.env.siteName,
        }}
      />
      <Layout>
        <PrivateRoute>
          <Component {...pageProps} />
        </PrivateRoute>
        <Analytics />
      </Layout>
    </SSRProvider>
  );
}

export default MyApp;
