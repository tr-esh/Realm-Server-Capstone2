import { Container, Grid } from "@mui/material";
import AppWidgetSummary from "../../app-widget-summary";
import Greeting from "../../../components/elements/Greetings";
import imageSource from "../../../img/dashboard-illustration.png";

export default function DashboardView() {

    return(
        <Container maxWidth='lg'>
            <Grid container spacing={3} mt={2} >
                <Grid item xs={12} sm={12} md={12}>
                    <AppWidgetSummary
                        sx={{
                            backgroundColor: '#8CACFF',
                            px: 4,
                            py: 4,
                        }}
                        title={<Greeting />}
                        imageSource={imageSource}
                        imageSize="35%"
                      />
                </Grid>

            </Grid>
        </Container>
    )
}