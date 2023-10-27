import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Layout } from "@/components/layouts";
import { EntryList, NewEntry } from "@/components/ui";

export default function Home() {
  return (
    <Layout title="Open Jira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
            {/* Agregar una tarea */}
            <NewEntry />
            {/* Listado de las tareas */}
            <EntryList status="pending" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En Progreso" />
            {/* Agregar una tarea */}

            {/* Listado de las tareas */}
            <EntryList status="in-progress" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Terminadas" />
            {/* Agregar una tarea */}

            {/* Listado de las tareas */}
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}
