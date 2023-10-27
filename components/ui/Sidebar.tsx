import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { useUiContext } from "@/hooks";
type Props = {}

const MENU_ITEMS = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = (props: Props) => {
  const { isOpenMenu, closeSideMenu } = useUiContext()
  return (
    <Drawer
      anchor="left"
      open={isOpenMenu}
      onClose={closeSideMenu}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant="h4">Menú</Typography>
        </Box>

        <List>
          {
            MENU_ITEMS.map((text, ind) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {ind % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))
          }
        </List>

        <Divider />

        <List>
          {
            MENU_ITEMS.map((text, ind) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {ind % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))
          }
        </List>
      </Box>

    </Drawer>
  )
}