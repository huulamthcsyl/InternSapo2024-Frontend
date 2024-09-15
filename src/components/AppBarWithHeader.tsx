import AppBar from '@mui/material/AppBar'

type Props = {}

export default function AppBarWithHeader({}: Props) {
  return (
    <AppBar sx={{ width: 'calc(100% - 240px)' }} position="fixed">
      <div>AppBarWithHeader</div>
    </AppBar>
  )
}