import { SkipNext, SkipPrevious } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

interface PagerProps {
  current: number;
  onNext: () => void;
  onPrev: () => void;
}

export function Pager({ current, onNext, onPrev }: PagerProps) {
  return (
    <Stack direction="row" spacing={2} justifyContent="left" alignItems="center" sx={{ mb: 1.5 }}>
      <Button
        disabled={current === 1}
        onClick={onPrev}
        variant="outlined"
        startIcon={<SkipPrevious />}
      >
        Previous
      </Button>
      <Typography variant="body1">- {current} -</Typography>
      <Button onClick={onNext} variant="outlined" endIcon={<SkipNext />}>
        Next
      </Button>
    </Stack>
  );
}
