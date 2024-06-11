"use client"

import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"
import Image from "next/image"
import ProfileComponent from "./profile-component"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import AccountComponent from "./account-component"
import SecurityComponent from "./security-component"
import PreferencesComponent from "./preference-component"

  
export const metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

export default function AccountLayoutComponent({ children }) {
  return (
    <>
      <div className="space-y-6 pt-10 pb-16 block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <Tabs defaultValue="account">
                <TabsList className="shadow mb-4">
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="account">Accounts</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                <TabsContent value="preferences">
                <Card>
                    <CardContent>
                        <div className="flex-1 p-4">
                            <PreferencesComponent />
                        </div>
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="profile">
                <Card>
                    <CardContent>
                        <div className="flex-1 p-4">
                            <ProfileComponent />
                        </div>
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="account">
                    <Card>
                        <CardContent>
                            <div className="flex-1 p-4">
                                <AccountComponent />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="security">
                    <Card>
                        <CardContent>
                            <div className="flex-1 p-4">
                                <SecurityComponent />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

          
        </div>
      </div>
    </>
  )
}