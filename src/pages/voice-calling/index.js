import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import ActiveCallDetail from "../../@core/layouts/components/ActiveCallDetail";
import Button from "../../@core/layouts/components/base/Button";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "../../utils";
import { firstMessage, name, prompt } from "../../utils/CONSTANTS";
import withAuth from "../../utils/withAuth";

// Vapi public key - replace with your own key in production
const VAPI_PUBLIC_KEY = "8118c26c-2258-437e-bc0a-773e839a459b";
const vapi = new Vapi(VAPI_PUBLIC_KEY);

const VoiceCalling = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callError, setCallError] = useState(null);

  // hook into Vapi events
  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(false);
      setConnected(true);
      setCallError(null);
    });

    vapi.on("call-end", () => {
      setConnecting(false);
      setConnected(false);
    });

    vapi.on("speech-start", () => {
      setAssistantIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      setAssistantIsSpeaking(false);
    });

    vapi.on("volume-level", (level) => {
      setVolumeLevel(level);
    });

    vapi.on("error", (error) => {
      console.error("Vapi error:", error);
      setConnecting(false);
      
      if (isPublicKeyMissingError({ vapiError: error })) {
        setCallError("Invalid Vapi API key. Please check your configuration.");
      } else {
        setCallError(`Call error: ${error.message || "Unknown error"}`);
      }
    });

    // Cleanup event listeners when component unmounts
    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  // call start handler
  const startCallInline = () => {
    setConnecting(true);
    setCallError(null);
    
    try {
      vapi.start(assistantOptions);
    } catch (error) {
      console.error("Failed to start call:", error);
      setConnecting(false);
      setCallError(`Failed to start call: ${error.message || "Unknown error"}`);
    }
  };

  const endCall = () => {
    try {
      vapi.stop();
    } catch (error) {
      console.error("Failed to end call:", error);
      setCallError(`Failed to end call: ${error.message || "Unknown error"}`);
      // Force reset state if we fail to end the call properly
      setConnected(false);
      setConnecting(false);
    }
  };

  const handleCloseError = () => {
    setCallError(null);
  };

  return (
    <Grid container spacing={6} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                AI Voice Assistant
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Call our AI-powered {name} assistant to get help with your inquiries.
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: '40vh',
              padding: 3
            }}>
              {!connected ? (
                <Button
                  label="Start Call"
                  onClick={startCallInline}
                  isLoading={connecting}
                />
              ) : (
                <ActiveCallDetail
                  assistantIsSpeaking={assistantIsSpeaking}
                  volumeLevel={volumeLevel}
                  onEndCallClick={endCall}
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Error Snackbar */}
      <Snackbar 
        open={!!callError} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {callError}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

const assistantOptions = {
  name: name,
  firstMessage: firstMessage,
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
  },
  voice: {
    provider: "playht",
    voiceId: "jennifer",
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompt
      },
    ],
  },
};

export default withAuth(VoiceCalling);
