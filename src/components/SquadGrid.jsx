import { useContext } from "react";
import { Container, Box, Grid, Card, CardContent, Typography, CardMedia, CardActions, Button } from "@mui/material";
import { CardContext } from "../contexts/CardContext";

function SquadGrid() {
    const { selectedCards, removeCard } = useContext(CardContext);

    return (
        <Container disableGutters>
            {selectedCards.length > 0 && (
                <Box mt={2} ml={0} pl={0}>
                    <Typography variant="h5" fontWeight="bold" align="center">All Squad ({selectedCards.length})</Typography>
                </Box>
            )}
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                {selectedCards.map((card, index) => (
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
                                    image={card.image}
                                    alt={card.name}
                                    sx={{
                                        width: 140,
                                        height: 140,
                                        objectFit: "contain",
                                        mb: 2,
                                    }}
                                />

                                <Typography variant="h6">{card.name}</Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <Button size="small" sx={{
                                    bgcolor: '#ca1b1b',
                                    color: '#FFFFFF',
                                    '&:hover': {
                                        bgcolor: '#a50d0d'
                                    }

                                }}
                                onClick={() => removeCard(card.name)}
                                >Release</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default SquadGrid;