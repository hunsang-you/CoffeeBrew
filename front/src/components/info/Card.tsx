import tw from 'tailwind-styled-components';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface PropsTypes {
  title: string;
  titleKo: string;
  content: string;
}

const CardComponent = ({ title, titleKo, content }: PropsTypes) => {
  return (
    <div className="w-240 m-10 ">
      <Card
        sx={{
          backgroundColor: 'rgba(244, 244, 244, 1)',
          height: '200px',
          alignItems: 'stretch',
          display: 'flex',
          overflow: 'auto',
          textOverflow: 'clip',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {titleKo}
          </Typography>
          <Typography variant="body2">{content}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardComponent;
