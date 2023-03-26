import tw from 'tailwind-styled-components';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CardComponent = () => {
  return (
    <div className="w-240 m-10 ">
      <Card sx={{ backgroundColor: 'rgba(244, 244, 244, 0.5)' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            겁나게쓰다(영어로)
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            겁나게쓰다
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardComponent;
