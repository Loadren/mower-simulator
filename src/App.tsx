import { Container, Alert, Box, Modal, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useMowers } from './app/hooks/useMowers';
import { FileUpload } from './app/components/FileUpload';
import { Results } from './app/components/Results';

function App() {
  const { handleFileDrop, finalMowers, error } = useMowers();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // This is only to show a loading spinner while the file is being processed
  // Since there is no backend here, we don't need it, but that's how it would have been prepared
  // waiting for the backend to be ready
  const handleFileChange = async (file: File) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 300));
    handleFileDrop(file);
    setLoading(false);
    if (error) return;
    setModalOpen(true);
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
          sx={{ transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, borderRadius: 2, minWidth: 300 }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Results mowers={finalMowers} />
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default App;
