"use client"

import Image from "next/image"

import LoginComponent from "./components/login-component"
import { useEffect, useState } from "react";
import ForgotPasswordComponent from "./components/forgot-password-component"
import SignupComponent from "./components/signup-component";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {

  const [authComponents, setAuthComponents] = useState({
      "loginPanel": {"isDisplayed": true},
      "resetPasswordPanel": {"isDisplayed": false},
      "signUpPanel": {"isDisplayed": false},
      "googleAuthPanel": {"isDisplayed": false}
    })

    const updateDisplayedPanel = (panelName) => {
      setAuthComponents((prevState) => {
        const updatedComponents = {};
        
        for (let panel in prevState) {
          updatedComponents[panel] = {
            ...prevState[panel],
            isDisplayed: panel === panelName
          };
        }
    
        return updatedComponents;
      });
    };

  return (
    <div className="w-full lg:grid min-h-[100vh] lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid min-w-[380px]">
          <div className="flex flex-col items-center justify-center">
            <a href="#" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                <Image className="w-8 h-8 mr-2" width="350" height="50" src="/logo.svg" alt="logo" />
                Uprolld.    
            </a>
          </div>
          <Card className="rounded-lg border-none mt-6">
            <CardContent className="p-6 grid gap-6">
              {authComponents.loginPanel.isDisplayed &&
              <LoginComponent authComponents={authComponents} setAuthComponents={setAuthComponents} updateDisplayedPanel={updateDisplayedPanel} />
              }
              {authComponents.resetPasswordPanel.isDisplayed &&
                <ForgotPasswordComponent authComponents={authComponents} setAuthComponents={setAuthComponents} updateDisplayedPanel={updateDisplayedPanel} />
              }
              {authComponents.signUpPanel.isDisplayed &&
                <SignupComponent authComponents={authComponents} setAuthComponents={setAuthComponents} updateDisplayedPanel={updateDisplayedPanel} />
              }
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/auth_bg.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] grayscale"
        />
      </div>
    </div>
  )
}
