import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";

function CardGrid({ data }) {
    return (
        <Grid container spacing={2}>
        {data.map((item, index) => {
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index + 1}.png`;

            return (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                    <CardContent
                        sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        }}
                    >
                        <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={item.name}
                        sx={{
                            width: 140,
                            height: 140,
                            objectFit: "contain",
                            mb: 2,
                        }}
                        />

                        <Typography variant="h6">{item.name}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            );
        })}
        </Grid>
  );
}

export default CardGrid;
