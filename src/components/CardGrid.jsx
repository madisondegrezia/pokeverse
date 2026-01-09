import { useContext } from "react"
import { Grid, Card, CardContent, Typography, CardMedia, CardActions, Button } from "@mui/material";
import { CardContext } from "../contexts/CardContext";

function CardGrid({ data }) {
    const { addCard } = useContext(CardContext);

    return (
        <Grid container spacing={2} justifyContent="center">
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
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" sx={{
                            bgcolor: '#31832d',
                            color: '#FFFFFF',
                            '&:hover': {
                                bgcolor: '#21591e'
                            }

                        }}
                        onClick={() => addCard({name: item.name, image: imageUrl})}>Catch</Button>
                    </CardActions>
                </Card>
            </Grid>
            );
        })}
        </Grid>
  );
}

export default CardGrid;
