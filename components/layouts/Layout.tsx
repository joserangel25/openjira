import { Box } from "@mui/material"
import Head from "next/head"
import { FC } from "react"
import { Navbar, Sidebar } from "../ui"

type Props = {
  title?: string
  children: JSX.Element | JSX.Element[]
}

export const Layout: FC<Props> = ({ title = 'OpenJira', children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      {/* Navbar */}
      <Navbar />
      {/* Sidebar */}
      <Sidebar />

      <Box sx={{ padding: '10px 20px' }}>
        {children}
      </Box>
    </Box>
  )
}