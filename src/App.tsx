import { Container, Typography, Alert, Box, Modal, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useMowers } from './app/hooks/useMowers';
import { FileUpload } from './app/components/FileUpload';
import { MowerAnimation } from './app/components/MowerAnimation';

function App() {
  const { handleFileDrop, mowerHistories, error, parsedData } = useMowers();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFileChange = async (file: File) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 300)); // short delay for spinner effect
    handleFileDrop(file);
    setLoading(false);
    if (!error) {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => setModalOpen(false);

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flexGrow={1}>
        <FileUpload onFileChange={handleFileChange} loading={loading} />
      </Box>
      {error && (
        <Alert severity="error" style={{ marginTop: '16px' }}>
          {error}
        </Alert>
      )}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            minWidth: '80%',
            maxWidth: '800px',
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
              <CircularProgress color="primary" />
            </Box>
          ) : mowerHistories && parsedData?.lawn ? (
            <MowerAnimation
              mowerHistories={mowerHistories}
              lawn={parsedData.lawn}
              parsedData={parsedData}
            />
          ) : (
            <Typography>No data to display.</Typography>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default App;
