import React, { useState, useRef, useEffect } from 'react';
import { Upload, Mic, Activity, Play, Pause, Trash2, X, Menu, CheckCircle, TrendingUp, Shield, Zap, Sparkles } from 'lucide-react';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{...styles.toast, ...(type === 'success' ? styles.toastSuccess : styles.toastError)}}>
      <div style={styles.toastIcon}>
        <CheckCircle size={18} />
      </div>
      <span>{message}</span>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div style={styles.skeletonContainer}>
      <div style={styles.skeletonCircle} />
      <div style={styles.skeletonLine} />
      <div style={{...styles.skeletonLine, width: '60%'}} />
      <div style={styles.skeletonButton} />
    </div>
  );
}

function FreeTrialBanner() {
  return (
    <div style={styles.trialBanner}>
      <div style={styles.trialBannerContent}>
        <Sparkles size={20} color="#8B5CF6" />
        <span style={styles.trialBannerText}>
          Enjoy free unlimited access until <strong>March 2026</strong>
        </span>
      </div>
    </div>
  );
}

function PricingPlans() {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: '/forever',
      features: ['3 detections per day', 'All detection methods', 'Basic support', 'Community access'],
      highlighted: false,
      badge: 'Always Free',
    },
    {
      name: 'Monthly',
      price: '₹49',
      period: '/month',
      features: ['Unlimited analyses', 'All detection methods', 'History tracking', 'Email support'],
      highlighted: false,
    },
    {
      name: '6 Months',
      price: '₹299',
      period: '/6 months',
      features: ['Everything in Monthly', 'Priority support', 'Advanced analytics', 'Export data'],
      highlighted: true,
      badge: 'Best Value',
      savings: 'Save ₹95 (24%)',
    },
  ];

  return (
    <div style={styles.pricingSection}>
      <div style={styles.pricingHeader}>
        <h2 style={styles.pricingTitle}>Simple, transparent pricing</h2>
        <p style={styles.pricingSubtitle}>Choose the plan that works for your family</p>
        <div style={styles.availabilityBadge}>Available March 2026</div>
      </div>
      
      <div style={styles.pricingGrid}>
        {plans.map((plan, index) => (
          <div 
            key={index} 
            style={{
              ...styles.pricingCard,
              ...(plan.highlighted && styles.pricingCardHighlighted)
            }}
            className="pricingCard"
          >
            {plan.badge && (
              <div style={styles.pricingBadge}>{plan.badge}</div>
            )}
            <h3 style={styles.planName}>{plan.name}</h3>
            <div style={styles.planPrice}>
              <span style={styles.priceAmount}>{plan.price}</span>
              <span style={styles.pricePeriod}>{plan.period}</span>
            </div>
            {plan.savings && (
              <div style={styles.savingsBadge}>{plan.savings}</div>
            )}
            <ul style={styles.featureList}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={styles.featureItem}>
                  <CheckCircle size={18} color={plan.highlighted ? '#8B5CF6' : '#10B981'} />
                  <span style={styles.featureText}>{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              style={{
                ...styles.planButton,
                ...(plan.highlighted && styles.planButtonHighlighted)
              }}
            >
              Coming Soon
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultDisplay({ result }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowSuccess(true), 300);
  }, []);

  const categoryInfo = {
    hungry: { 
      icon: '🍼', 
      color: '#8B5CF6', 
      bg: '#F3E8FF', 
      label: 'Hungry', 
      advice: 'Your baby might need feeding',
      instructions: [
        'Check when your baby last fed - newborns need feeding every 2-3 hours',
        'Prepare a bottle or get comfortable for breastfeeding in a quiet space',
        'Ensure proper latching and watch for swallowing cues',
        'Burp your baby halfway through and after feeding to prevent discomfort',
        'Keep track of feeding times to establish a routine'
      ]
    },
    tired: { 
      icon: '😴', 
      color: '#6366F1', 
      bg: '#E0E7FF', 
      label: 'Tired', 
      advice: 'Time for a nap or bedtime routine',
      instructions: [
        'Create a calm, dimly lit environment to signal sleep time',
        'Swaddle your baby snugly to provide comfort and security',
        'Use gentle rocking or rhythmic patting to soothe them',
        'Play soft white noise or lullabies to mask household sounds',
        'Watch for sleep cues like eye rubbing or yawning and act promptly'
      ]
    },
    belly_pain: { 
      icon: '😣', 
      color: '#EF4444', 
      bg: '#FEE2E2', 
      label: 'Belly Pain', 
      advice: 'Gentle tummy massage may help',
      instructions: [
        'Lay baby on their back and gently massage tummy in clockwise circles',
        'Try "bicycle legs" - gently move their legs in a cycling motion',
        'Hold baby against your chest with gentle pressure on their tummy',
        'A warm (not hot) compress on the belly can provide relief',
        'If pain persists beyond 2 hours or baby has fever, contact your pediatrician'
      ]
    },
    burping: { 
      icon: '💨', 
      color: '#F59E0B', 
      bg: '#FEF3C7', 
      label: 'Needs Burping', 
      advice: 'Try gentle burping positions',
      instructions: [
        'Hold baby upright against your chest and gently pat or rub their back',
        'Try sitting baby on your lap, supporting their chest and chin, then pat back',
        'Lay baby face-down across your lap and gently rub their back',
        'Burp after every 2-3 ounces during bottle feeding',
        'If no burp after 5 minutes, resume feeding and try again later'
      ]
    },
    discomfort: { 
      icon: '😢', 
      color: '#EC4899', 
      bg: '#FCE7F3', 
      label: 'Discomfort', 
      advice: 'Check diaper or adjust clothing',
      instructions: [
        'Check if diaper is wet or soiled and change immediately if needed',
        'Ensure clothing isn\'t too tight, scratchy, or causing overheating',
        'Check for any hair wrapped around fingers or toes (hair tourniquet)',
        'Adjust room temperature - babies are comfortable at 68-72°F (20-22°C)',
        'Look for any signs of rash, irritation, or discomfort that need attention'
      ]
    }
  };

  const info = categoryInfo[result.predicted_class] || categoryInfo.discomfort;
  const probabilities = Object.entries(result.all_probabilities || {})
    .sort(([, a], [, b]) => b - a);

  return (
    <>
      <FreeTrialBanner />
      <div style={{
        ...styles.resultContainer,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {showSuccess && (
          <div style={styles.successBadge}>
            <CheckCircle size={16} />
            <span>Analysis Complete</span>
          </div>
        )}
        
        <div style={styles.resultCard}>
          <div style={{...styles.resultIcon, backgroundColor: info.bg}}>
            <span style={styles.resultEmoji}>{info.icon}</span>
          </div>
          
          <h3 style={styles.resultTitle}>{info.label}</h3>
          <p style={styles.resultAdvice}>{info.advice}</p>
          
          <div style={styles.confidenceBadge}>
            <span style={styles.confidenceLabel}>Confidence</span>
            <div style={styles.confidenceValueWrapper}>
              <span style={styles.confidenceValue}>{(result.confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div style={styles.probabilitiesCard}>
          <h4 style={styles.probabilitiesTitle}>Detailed Analysis</h4>
          <div style={styles.probabilitiesList}>
            {probabilities.map(([category, prob], index) => {
              const catInfo = categoryInfo[category];
              return (
                <div key={category} style={{
                  ...styles.probabilityItem,
                  animation: `slideIn 0.4s ease-out ${index * 0.1}s backwards`
                }}>
                  <div style={styles.probabilityLabel}>
                    <span style={styles.probabilityEmoji}>{catInfo?.icon}</span>
                    <span style={styles.probabilityName}>{catInfo?.label}</span>
                  </div>
                  <div style={styles.probabilityBar}>
                    <div 
                      style={{
                        ...styles.probabilityFill,
                        width: `${prob * 100}%`,
                        backgroundColor: catInfo?.color
                      }}
                    />
                  </div>
                  <span style={styles.probabilityPercent}>{(prob * 100).toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.trustIndicators}>
          <div style={styles.trustItem}>
            <Shield size={18} color="#10B981" />
            <span>Secure Analysis</span>
          </div>
          <div style={styles.trustItem}>
            <Zap size={18} color="#F59E0B" />
            <span>Instant Results</span>
          </div>
          <div style={styles.trustItem}>
            <TrendingUp size={18} color="#6366F1" />
            <span>AI-Powered</span>
          </div>
        </div>

        {/* Care Instructions Section */}
        <div style={styles.careInstructionsCard}>
          <div style={styles.careInstructionsHeader}>
            <Sparkles size={20} color="#8B5CF6" />
            <h4 style={styles.careInstructionsTitle}>What To Do Next</h4>
          </div>
          
          <div style={styles.careInstructionsContent}>
            <ol style={styles.instructionsList}>
              {info.instructions.map((instruction, index) => (
                <li key={index} style={styles.instructionItem}>
                  <span style={styles.instructionNumber}>{index + 1}</span>
                  <span style={styles.instructionText}>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div style={styles.emergencyNote}>
            <div style={styles.emergencyContent}>
              <h5 style={styles.emergencyTitle}>When to Seek Immediate Medical Help</h5>
              <p style={styles.emergencyText}>
                    If your baby cries for over 2–3 hours, has a fever, trouble breathing, is very sleepy, won’t feed,
                    or shows unusual symptoms, contact your pediatrician right away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function UploadTab() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile) => {
    const validTypes = ['audio/wav', 'audio/mpeg', 'audio/mp4', 'audio/flac', 'audio/ogg', 'audio/x-m4a'];
    
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(wav|mp3|m4a|flac|ogg)$/i)) {
      setError('Invalid file type. Please upload WAV, MP3, M4A, FLAC, or OGG');
      setToast({ message: 'Invalid file type', type: 'error' });
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10MB');
      setToast({ message: 'File too large', type: 'error' });
      return;
    }

    setFile(selectedFile);
    setError(null);
    setResult(null);
    setToast({ message: 'File uploaded successfully', type: 'success' });
  };

  const handlePredict = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    setTimeout(() => {
      const dummyResult = {
        predicted_class: 'hungry',
        confidence: 0.87,
        meets_threshold: true,
        all_probabilities: {
          hungry: 0.87,
          tired: 0.06,
          belly_pain: 0.03,
          burping: 0.02,
          discomfort: 0.02
        }
      };
      
      setResult(dummyResult);
      setLoading(false);
      setToast({ message: 'Analysis completed', type: 'success' });
    }, 2000);
  };

  return (
    <div style={styles.tabContent}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div
        style={{...styles.uploadArea, ...(dragActive && styles.uploadAreaActive)}}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div style={styles.uploadIcon}>
          <Upload size={48} color="#8B5CF6" />
        </div>
        
        <h3 style={styles.uploadTitle}>
          {file ? file.name : 'Drop your audio file here'}
        </h3>
        <p style={styles.uploadDescription}>
          or click to browse your files
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".wav,.mp3,.m4a,.flac,.ogg"
          onChange={(e) => e.target.files[0] && handleFileChange(e.target.files[0])}
          style={{ display: 'none' }}
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          style={styles.uploadButton}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Select file
        </button>
        
        <p style={styles.uploadNote}>
          Supported: WAV, MP3, M4A, FLAC, OGG · Max 10MB
        </p>
      </div>

      {file && (
        <div style={styles.filePreview}>
          <div style={styles.fileInfo}>
            <div style={styles.fileIconWrapper}>
              <Activity size={20} color="#8B5CF6" />
            </div>
            <div>
              <p style={styles.fileName}>{file.name}</p>
              <p style={styles.fileSize}>{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          <button
            onClick={() => {
              setFile(null);
              setResult(null);
            }}
            style={styles.fileRemove}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#FEE2E2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {error && (
        <div style={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}

      {file && !result && (
        <button
          onClick={handlePredict}
          disabled={loading}
          style={{...styles.predictButton, ...(loading && styles.predictButtonDisabled)}}
        >
          {loading ? (
            <div style={styles.buttonContent}>
              <div style={styles.buttonSpinner} />
              <span>Analyzing audio...</span>
            </div>
          ) : 'Analyze audio'}
        </button>
      )}

      {loading && <SkeletonLoader />}
      {result && !loading && <ResultDisplay result={result} />}
    </div>
  );
}

function RecordTab() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toast, setToast] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        } 
      });
      
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
        setToast({ message: 'Recording saved', type: 'success' });
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      setResult(null);
      setError(null);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (err) {
      console.error('Microphone error:', err);
      setError('Microphone access denied. Please allow microphone permissions.');
      setToast({ message: 'Microphone access denied', type: 'error' });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePredict = async () => {
    if (!audioBlob) return;

    setLoading(true);
    setError(null);

    setTimeout(() => {
      const dummyResult = {
        predicted_class: 'tired',
        confidence: 0.82,
        meets_threshold: true,
        all_probabilities: {
          tired: 0.82,
          hungry: 0.09,
          discomfort: 0.05,
          belly_pain: 0.02,
          burping: 0.02
        }
      };
      
      setResult(dummyResult);
      setLoading(false);
      setToast({ message: 'Analysis completed', type: 'success' });
    }, 2000);
  };

  const clearRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setResult(null);
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.tabContent}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div style={styles.recordControl}>
        <div style={styles.recordIconWrapper}>
          <div style={{...styles.recordIcon, ...(isRecording && styles.recordIconActive)}}>
            <Mic size={40} color={isRecording ? '#EF4444' : '#8B5CF6'} />
          </div>
        </div>

        {isRecording && (
          <div style={styles.recordTime}>
            {formatTime(recordingTime)}
          </div>
        )}

        <div style={styles.recordControls}>
          {!isRecording && !audioBlob ? (
            <button
              onClick={startRecording}
              disabled={loading}
              style={styles.recordButton}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Start Recording
            </button>
          ) : isRecording ? (
            <button
              onClick={stopRecording}
              style={{...styles.recordButton, ...styles.recordButtonStop}}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Stop Recording
            </button>
          ) : null}
        </div>

        <p style={styles.recordNote}>
          {isRecording 
            ? 'Recording in progress...' 
            : 'Record at least 3 seconds of audio for best results'}
        </p>
      </div>

      {audioUrl && (
        <div style={styles.audioPreview}>
          <div style={styles.audioPreviewHeader}>
            <h4 style={styles.audioPreviewTitle}>Recorded Audio</h4>
            <button
              onClick={clearRecording}
              style={styles.audioDelete}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#FEE2E2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div style={styles.audioPlayer}>
            <audio 
              ref={audioRef} 
              src={audioUrl} 
              onEnded={() => setIsPlaying(false)}
              style={{ display: 'none' }}
            />
            
            <button
              onClick={togglePlayback}
              style={styles.playButton}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <div style={styles.audioInfo}>
              <div style={styles.audioMeta}>
                <span>Duration: {formatTime(recordingTime)}</span>
                <span>{isPlaying ? 'Playing' : 'Paused'}</span>
              </div>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: isPlaying ? '100%' : '0%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}

      {audioBlob && !result && (
        <button
          onClick={handlePredict}
          disabled={loading}
          style={{...styles.predictButton, ...(loading && styles.predictButtonDisabled)}}
        >
          {loading ? (
            <div style={styles.buttonContent}>
              <div style={styles.buttonSpinner} />
              <span>Analyzing audio...</span>
            </div>
          ) : 'Analyze Recording'}
        </button>
      )}

      {loading && <SkeletonLoader />}
      {result && !loading && <ResultDisplay result={result} />}
    </div>
  );
}

function LiveTab() {
  const [isListening, setIsListening] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [latestResult, setLatestResult] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.start(2000);
      setIsListening(true);
      setPredictions([]);
      setLatestResult(null);
      setError(null);
      
      intervalRef.current = setInterval(() => {
        processChunks();
      }, 2000);
      
      mediaRecorderRef.current.onstop = () => {
        clearInterval(intervalRef.current);
        stream.getTracks().forEach(track => track.stop());
      };
      
    } catch (err) {
      setError('Microphone access denied or not available');
      setToast({ message: 'Microphone access denied', type: 'error' });
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      setToast({ message: 'Live detection stopped', type: 'success' });
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const processChunks = () => {
    setLoading(true);
    
    setTimeout(() => {
      const cryTypes = ['hungry', 'tired', 'belly_pain', 'burping', 'discomfort'];
      const randomType = cryTypes[Math.floor(Math.random() * cryTypes.length)];
      const randomConfidence = (Math.random() * 0.4 + 0.6).toFixed(2);
      
      const newPrediction = {
        predicted_class: randomType,
        confidence: parseFloat(randomConfidence),
        timestamp: new Date().toLocaleTimeString(),
        id: Date.now(),
      };
      
      setPredictions(prev => [newPrediction, ...prev].slice(0, 10));
      
      // Set latest result for detailed view
      if (!latestResult) {
        const fullResult = {
          predicted_class: randomType,
          confidence: parseFloat(randomConfidence),
          meets_threshold: true,
          all_probabilities: {
            [randomType]: parseFloat(randomConfidence),
            hungry: Math.random() * 0.3,
            tired: Math.random() * 0.2,
            belly_pain: Math.random() * 0.15,
            burping: Math.random() * 0.1,
            discomfort: Math.random() * 0.1
          }
        };
        setLatestResult(fullResult);
      }
      
      setLoading(false);
    }, 500);
  };

  const categoryInfo = {
    hungry: { label: 'Hungry', color: '#8B5CF6' },
    tired: { label: 'Tired', color: '#6366F1' },
    belly_pain: { label: 'Belly Pain', color: '#EF4444' },
    burping: { label: 'Needs Burping', color: '#F59E0B' },
    discomfort: { label: 'Discomfort', color: '#EC4899' }
  };

  return (
    <div style={styles.tabContent}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      

        <div style={{...styles.liveControl, position: 'relative'}}>
          {isListening && <div style={styles.liveIndicatorDot} />}
          <div style={styles.liveIconWrapper}>
            <div style={{...styles.liveIcon, ...(isListening && styles.liveIconActive)}}>
              <Activity size={40} color={isListening ? '#10B981' : '#8B5CF6'} />
            </div>
          </div>

        {isListening && (
          <div style={styles.liveStatus}>
            <p style={styles.liveStatusTitle}>Live Detection Active</p>
            <p style={styles.liveStatusSubtitle}>Analyzing audio in real-time...</p>
          </div>
        )}

        <div style={styles.liveControls}>
          {!isListening ? (
            <button
              onClick={startListening}
              style={styles.liveButton}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Start Live Detection
            </button>
          ) : (
            <button
              onClick={stopListening}
              style={{...styles.liveButton, ...styles.liveButtonStop}}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Stop Detection
            </button>
          )}
        </div>

        <p style={styles.liveNote}>
          Continuous monitoring with 2-second intervals
        </p>
      </div>

      {loading && (
        <div style={styles.loadingIndicator}>
          <div style={styles.spinner} />
          <span>Processing...</span>
        </div>
      )}

      {error && (
        <div style={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}

      {predictions.length > 0 && (
        <>
          <div style={styles.predictionsList}>
            <h3 style={styles.predictionsTitle}>Recent Detections</h3>
            <div style={styles.predictionsItems}>
              {predictions.map((pred) => {
                const info = categoryInfo[pred.predicted_class];
                return (
                  <div key={pred.id} style={styles.predictionItem}>
                    <div style={styles.predictionContent}>
                      <div style={styles.predictionInfo}>
                        <p style={styles.predictionClass}>
                          {info?.label || pred.predicted_class.replace('_', ' ')}
                        </p>
                        <p style={styles.predictionTime}>{pred.timestamp}</p>
                      </div>
                      {pred.confidence && (
                        <div style={{
                          ...styles.predictionConfidence,
                          backgroundColor: pred.confidence >= 0.7 ? '#10B981' : pred.confidence >= 0.5 ? '#F59E0B' : '#6B7280'
                        }}>
                          {(pred.confidence * 100).toFixed(1)}%
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {isListening && predictions.length === 0 && (
        <div style={styles.emptyState}>
          <p>Listening for audio... Predictions will appear here</p>
        </div>
      )}

      {/* Show detailed analysis for latest result */}
      {latestResult && predictions.length > 0 && (
        <ResultDisplay result={latestResult} />
      )}
    </div>
  );
}

export default function PredictionPage() {
  const [activeTab, setActiveTab] = useState('record');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['upload', 'record', 'live'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const scrollToFooter = () => {
    const footer = document.getElementById('about');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabs = [
    { id: 'upload', label: 'Upload', desc: 'Upload audio files', icon: Upload },
    { id: 'record', label: 'Record', desc: 'Record in real-time', icon: Mic },
    { id: 'live', label: 'Live', desc: 'Continuous monitoring', icon: Activity },
  ];

  return (
    <div style={styles.page}>
      <style>{keyframes}</style>

      <nav style={{...styles.navbar, ...(scrolled && styles.navbarScrolled)}}>
        <div style={styles.navbarContainer}>
          <div style={styles.navbarContent}>
            <div style={styles.navbarLogo} onClick={handleHomeClick}>
              <img 
                src="logo.png" 
                alt="DontCry AI Logo" 
                style={styles.navbarLogoImage}
              />
              <span style={styles.navbarLogoText}>DontCry ai</span>
            </div>
            
            <div style={styles.navbarMenu} className="navbarMenu">
              <button onClick={handleHomeClick} style={styles.navbarLink}>
                Home
              </button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={styles.navbarLink}>
                Detect
              </button>
              <button onClick={scrollToFooter} style={styles.navbarLink}>
                About
              </button>
            </div>

            <button 
              style={styles.mobileMenuButton}
              className="mobileMenuButton"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div style={styles.mobileMenu} className="mobileMenu">
            <button onClick={() => { handleHomeClick(); setMobileMenuOpen(false); }} style={styles.mobileMenuLink}>
              Home
            </button>
            <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} style={styles.mobileMenuLink}>
              Detect
            </button>
            <button onClick={() => { scrollToFooter(); setMobileMenuOpen(false); }} style={styles.mobileMenuLink}>
              About
            </button>
          </div>
        )}
      </nav>

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            Analyze your <span style={styles.titleHighlight}>baby's cry</span>
          </h1>
          <p style={styles.subtitle}>
            Choose your preferred detection method
          </p>
        </div>

        <div style={styles.card}>
          <div style={styles.tabs}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    ...styles.tabButton,
                    ...(activeTab === tab.id && styles.tabButtonActive)
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={20} />
                  <div style={styles.tabText}>
                    <span style={styles.tabLabel}>{tab.label}</span>
                    <span style={styles.tabDesc} className="tabDesc">{tab.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={styles.tabContentWrapper}>
            {activeTab === 'upload' && <UploadTab />}
            {activeTab === 'record' && <RecordTab />}
            {activeTab === 'live' && <LiveTab />}
          </div>
        </div>

        <PricingPlans />
      </div>

      <footer id="about" style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerBrand}>
            <h3 style={styles.footerLogo}>DontCry ai</h3>
            <p style={styles.footerTagline}>Trusted Intelligence. Confident Care.</p>
          </div>
          <div style={styles.footerRight}>
            <p style={styles.footerEmail}>dontcrytech@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const keyframes = `

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes livePulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.6;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }



  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2);
    }
    50% {
      box-shadow: 0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3);
    }
  }

  .pricingCard {
    transition: all 0.3s ease;
  }

  .pricingCard:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(139, 92, 246, 0.2);
  }

  @media (max-width: 1024px) {
    .navbarMenu {
      display: none !important;
    }
    .mobileMenuButton {
      display: flex !important;
    }
  }

  @media (min-width: 1025px) {
    .mobileMenuButton {
      display: none !important;
    }
    .mobileMenu {
      display: none !important;
    }
  }

  @media (min-width: 768px) {
    .tabDesc {
      display: block !important;
    }
  }
`;

const styles = {
  liveIndicatorDot: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '10px',
    height: '10px',
    backgroundColor: '#EF4444',
    borderRadius: '50%',
    animation: 'livePulse 1.2s ease-in-out infinite',
    boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
    zIndex: 10,
  },
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    paddingTop: '72px',
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease'
  },
  navbarScrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.05)'
  },
  navbarContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 32px'
  },
  navbarContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '72px'
  },
  navbarLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
  navbarLogoImage: {
    width: '32px',
    height: '32px',
    objectFit: 'contain'
  },
  navbarLogoText: {
    letterSpacing: '-0.01em'
  },
  navbarMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px'
  },
  navbarLink: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#6B7280',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: 0,
    position: 'relative',
  },
  mobileMenuButton: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    border: 'none',
    background: 'none',
    color: '#111827',
    cursor: 'pointer'
  },
    mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '4px',
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
    backgroundColor: 'white',
    animation: 'slideDown 0.3s ease-out',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  
  mobileMenuLink: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#4B5563',
    textDecoration: 'none',
    padding: '12px 16px',
    textAlign: 'left',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    animation: 'fadeIn 0.4s ease-out',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  title: {
    fontSize: 'clamp(36px, 6vw, 54px)',
    fontWeight: '300',
    color: '#111827',
    marginBottom: '16px',
    letterSpacing: '-0.03em',
    lineHeight: '1.2',
  },
  titleHighlight: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 'clamp(16px, 2.5vw, 19px)',
    color: '#6B7280',
    fontWeight: '400',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
    border: '1px solid #F3F4F6',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease',
  },
  tabs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0',
    borderBottom: '1px solid #F3F4F6',
    backgroundColor: '#FAFAFA',
  },
  tabButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '20px 12px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderBottom: '3px solid transparent',
    color: '#6B7280',
  },
  tabButtonActive: {
    backgroundColor: 'white',
    borderBottom: '3px solid #8B5CF6',
    color: '#111827',
  },
  tabText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  tabLabel: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '2px',
  },
  tabDesc: {
    fontSize: '13px',
    color: '#9CA3AF',
    fontWeight: '400',
    display: 'none',
  },
  tabContentWrapper: {
    padding: '40px',
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  toast: {
    position: 'fixed',
    top: '100px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    zIndex: 1001,
    animation: 'slideDown 0.3s ease-out',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  },
  toastSuccess: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
    border: '1px solid #10B981',
  },
  toastError: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
    border: '1px solid #EF4444',
  },
  toastIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  trialBanner: {
    backgroundColor: '#F3E8FF',
    borderRadius: '16px',
    padding: '16px 24px',
    marginBottom: '24px',
    border: '1px solid #E9D5FF',
    animation: 'fadeIn 0.5s ease-out',
  },
  trialBannerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  trialBannerText: {
    fontSize: '15px',
    color: '#6B21A8',
    fontWeight: '500',
  },
  uploadArea: {
    border: '2px dashed #E5E7EB',
    borderRadius: '20px',
    padding: '60px 40px',
    textAlign: 'center',
    backgroundColor: '#FAFAFA',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  uploadAreaActive: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3E8FF',
    transform: 'scale(1.02)',
  },
  uploadIcon: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '8px',
    letterSpacing: '-0.01em',
  },
  uploadDescription: {
    fontSize: '15px',
    color: '#6B7280',
    marginBottom: '24px',
  },
  uploadButton: {
    padding: '12px 32px',
    backgroundColor: '#111827',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(17, 24, 39, 0.15)',
  },
  uploadNote: {
    fontSize: '13px',
    color: '#9CA3AF',
    marginTop: '20px',
  },
  filePreview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#F9FAFB',
    borderRadius: '16px',
    border: '1px solid #E5E7EB',
    animation: 'fadeIn 0.3s ease-out',
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  fileIconWrapper: {
    width: '48px',
    height: '48px',
    backgroundColor: '#F3E8FF',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '4px',
  },
  fileSize: {
    fontSize: '13px',
    color: '#6B7280',
  },
  fileRemove: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#6B7280',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  },
  errorMessage: {
    padding: '16px 20px',
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    animation: 'slideDown 0.3s ease-out',
  },
  predictButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#8B5CF6',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
  },
  predictButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  buttonSpinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  skeletonContainer: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  skeletonCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
  skeletonLine: {
    width: '80%',
    height: '20px',
    borderRadius: '10px',
    background: 'linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
  skeletonButton: {
    width: '60%',
    height: '40px',
    borderRadius: '12px',
    background: 'linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
  recordControl: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  recordIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  recordIcon: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#F3E8FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
  },
  recordIconActive: {
    backgroundColor: '#FEE2E2',
    animation: 'pulse 2s ease-in-out infinite',
    boxShadow: '0 4px 30px rgba(239, 68, 68, 0.3)',
  },
  recordTime: {
    fontSize: '36px',
    fontWeight: '300',
    color: '#111827',
    marginBottom: '24px',
    letterSpacing: '-0.02em',
  },
  recordControls: {
    marginBottom: '20px',
  },
  recordButton: {
    padding: '14px 36px',
    backgroundColor: '#8B5CF6',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
  },
  recordButtonStop: {
    backgroundColor: '#EF4444',
    boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
  },
  recordNote: {
    fontSize: '14px',
    color: '#6B7280',
    fontWeight: '400',
  },
  audioPreview: {
    backgroundColor: '#F9FAFB',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #E5E7EB',
    animation: 'fadeIn 0.3s ease-out',
  },
  audioPreviewHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  audioPreviewTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
  },
  audioDelete: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#6B7280',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  },
  audioPlayer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  playButton: {
    width: '48px',
    height: '48px',
    backgroundColor: '#8B5CF6',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flexShrink: 0,
    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)',
  },
  audioInfo: {
    flex: 1,
  },
  audioMeta: {
    display: 'flex',
    justifyContent: 'space-between',
fontSize: '13px',
color: '#6B7280',
marginBottom: '8px',
},
progressBar: {
width: '100%',
height: '6px',
backgroundColor: '#E5E7EB',
borderRadius: '100px',
overflow: 'hidden',
},
progressFill: {
height: '100%',
backgroundColor: '#8B5CF6',
borderRadius: '100px',
transition: 'width 0.3s ease',
},
liveControl: {
textAlign: 'center',
padding: '40px 20px',
},
liveIconWrapper: {
display: 'flex',
justifyContent: 'center',
marginBottom: '24px',
},
liveIcon: {
width: '120px',
height: '120px',
borderRadius: '50%',
backgroundColor: '#F3E8FF',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
transition: 'all 0.3s ease',
boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
},
liveIconActive: {
backgroundColor: '#D1FAE5',
animation: 'pulse 2s ease-in-out infinite',
boxShadow: '0 4px 30px rgba(16, 185, 129, 0.3)',
},
liveStatus: {
marginBottom: '24px',
},
liveStatusTitle: {
fontSize: '20px',
fontWeight: '500',
color: '#111827',
marginBottom: '8px',
},
liveStatusSubtitle: {
fontSize: '14px',
color: '#6B7280',
},
liveControls: {
marginBottom: '20px',
},
liveButton: {
padding: '14px 36px',
backgroundColor: '#8B5CF6',
color: 'white',
border: 'none',
borderRadius: '16px',
fontSize: '16px',
fontWeight: '600',
cursor: 'pointer',
transition: 'all 0.3s ease',
boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
},
liveButtonStop: {
backgroundColor: '#EF4444',
boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
},
liveNote: {
fontSize: '14px',
color: '#6B7280',
fontWeight: '400',
},
loadingIndicator: {
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
gap: '12px',
padding: '20px',
color: '#6B7280',
fontSize: '14px',
},
spinner: {
width: '20px',
height: '20px',
border: '3px solid #E5E7EB',
borderTop: '3px solid #8B5CF6',
borderRadius: '50%',
animation: 'spin 1s linear infinite',
},
predictionsList: {
marginTop: '24px',
},
predictionsTitle: {
fontSize: '18px',
fontWeight: '600',
color: '#111827',
marginBottom: '16px',
},
predictionsItems: {
display: 'flex',
flexDirection: 'column',
gap: '12px',
},
predictionItem: {
backgroundColor: '#F9FAFB',
borderRadius: '12px',
padding: '16px 20px',
border: '1px solid #E5E7EB',
transition: 'all 0.3s ease',
animation: 'slideIn 0.3s ease-out',
},
predictionContent: {
display: 'flex',
alignItems: 'center',
justifyContent: 'space-between',
},
predictionInfo: {
flex: 1,
},
predictionClass: {
fontSize: '16px',
fontWeight: '600',
color: '#111827',
marginBottom: '4px',
textTransform: 'capitalize',
},
predictionTime: {
fontSize: '13px',
color: '#6B7280',
},
predictionConfidence: {
padding: '6px 14px',
borderRadius: '100px',
fontSize: '14px',
fontWeight: '600',
color: 'white',
},
emptyState: {
textAlign: 'center',
padding: '60px 20px',
color: '#9CA3AF',
fontSize: '15px',
},
successBadge: {
display: 'inline-flex',
alignItems: 'center',
gap: '8px',
padding: '8px 16px',
backgroundColor: '#D1FAE5',
color: '#065F46',
borderRadius: '100px',
fontSize: '14px',
fontWeight: '500',
marginBottom: '24px',
animation: 'slideDown 0.3s ease-out',
},
resultContainer: {
display: 'flex',
flexDirection: 'column',
gap: '24px',
marginTop: '32px',
},
resultCard: {
backgroundColor: 'white',
borderRadius: '20px',
padding: '40px',
textAlign: 'center',
border: '1px solid #F3F4F6',
boxShadow: '0 10px 40px rgba(139, 92, 246, 0.12)',
},
resultIcon: {
width: '100px',
height: '100px',
borderRadius: '50%',
margin: '0 auto 24px',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
animation: 'pulse 2s ease-in-out infinite',
},
resultEmoji: {
fontSize: '48px',
},
resultTitle: {
fontSize: '32px',
fontWeight: '500',
color: '#111827',
marginBottom: '12px',
letterSpacing: '-0.02em',
},
resultAdvice: {
fontSize: '16px',
color: '#6B7280',
marginBottom: '28px',
lineHeight: '1.6',
},
confidenceBadge: {
display: 'inline-flex',
alignItems: 'center',
gap: '12px',
padding: '12px 24px',
backgroundColor: '#F3E8FF',
borderRadius: '100px',
},
confidenceLabel: {
fontSize: '14px',
color: '#6B7280',
fontWeight: '500',
},
confidenceValueWrapper: {
display: 'flex',
alignItems: 'center',
},
confidenceValue: {
fontSize: '20px',
fontWeight: '700',
color: '#8B5CF6',
},
probabilitiesCard: {
backgroundColor: '#FAFAFA',
borderRadius: '20px',
padding: '32px',
border: '1px solid #F3F4F6',
},
probabilitiesTitle: {
fontSize: '18px',
fontWeight: '600',
color: '#111827',
marginBottom: '24px',
},
probabilitiesList: {
display: 'flex',
flexDirection: 'column',
gap: '16px',
},
probabilityItem: {
display: 'grid',
gridTemplateColumns: '140px 1fr 60px',
alignItems: 'center',
gap: '16px',
},
probabilityLabel: {
display: 'flex',
alignItems: 'center',
gap: '8px',
},
probabilityEmoji: {
fontSize: '20px',
},
probabilityName: {
fontSize: '15px',
fontWeight: '500',
color: '#111827',
},
probabilityBar: {
height: '8px',
backgroundColor: '#E5E7EB',
borderRadius: '100px',
overflow: 'hidden',
},
probabilityFill: {
height: '100%',
borderRadius: '100px',
transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
},
probabilityPercent: {
fontSize: '14px',
fontWeight: '600',
color: '#6B7280',
textAlign: 'right',
},
trustIndicators: {
display: 'flex',
justifyContent: 'center',
gap: '24px',
marginTop: '16px',
flexWrap: 'wrap',
},
trustItem: {
display: 'flex',
alignItems: 'center',
gap: '8px',
fontSize: '13px',
color: '#6B7280',
fontWeight: '500',
},
parentMessage: {
backgroundColor: '#FEF3C7',
borderRadius: '16px',
padding: '20px 24px',
border: '1px solid #FDE047',
marginTop: '8px',
},
parentMessageText: {
fontSize: '14px',
color: '#78350F',
lineHeight: '1.7',
margin: 0,
},
careInstructionsCard: {
backgroundColor: 'white',
borderRadius: '20px',
padding: '32px',
border: '1px solid #E0E7FF',
boxShadow: '0 4px 20px rgba(139, 92, 246, 0.08)',
},
careInstructionsHeader: {
display: 'flex',
alignItems: 'center',
gap: '12px',
marginBottom: '24px',
},
careInstructionsTitle: {
fontSize: '18px',
fontWeight: '600',
color: '#111827',
margin: 0,
},
careInstructionsContent: {
marginBottom: '24px',
},
instructionsList: {
listStyle: 'none',
padding: 0,
margin: 0,
display: 'flex',
flexDirection: 'column',
gap: '16px',
},
instructionItem: {
display: 'flex',
gap: '16px',
alignItems: 'flex-start',
},
instructionNumber: {
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
width: '32px',
height: '32px',
backgroundColor: '#8B5CF6',
color: 'white',
borderRadius: '50%',
fontSize: '14px',
fontWeight: '600',
flexShrink: 0,
},
instructionText: {
fontSize: '15px',
color: '#374151',
lineHeight: '1.7',
paddingTop: '4px',
},

emergencyNote: {
  backgroundColor: 'white', // soft grey
  borderRadius: '16px',
  padding: '20px',
  border: '1px solid #E5E7EB', // gentle border
  display: 'flex',
  gap: '16px',
},



emergencyContent: {
flex: 1,
},
emergencyTitle: {
fontSize: '16px',
fontWeight: '600',
color: 'black',
marginBottom: '8px',
margin: 0,
},
emergencyText: {
fontSize: '14px',
color: 'gray',
lineHeight: '1.7',
margin: 0,
},
pricingSection: {
marginTop: '80px',
marginBottom: '40px',
},
pricingHeader: {
textAlign: 'center',
marginBottom: '48px',
},
pricingTitle: {
fontSize: 'clamp(32px, 5vw, 42px)',
fontWeight: '500',
color: '#111827',
marginBottom: '12px',
letterSpacing: '-0.02em',
},
pricingSubtitle: {
fontSize: '18px',
color: '#6B7280',
marginBottom: '24px',
},
availabilityBadge: {
display: 'inline-block',
padding: '10px 20px',
backgroundColor: '#1F2937',
color: 'white',
borderRadius: '100px',
fontSize: '14px',
fontWeight: '600',
},
pricingGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
gap: '24px',
maxWidth: '1200px',
margin: '0 auto',
},
pricingCard: {
backgroundColor: 'white',
borderRadius: '24px',
padding: '40px 32px',
border: '2px solid #F3F4F6',
position: 'relative',
overflow: 'hidden',
},
pricingCardHighlighted: {
backgroundColor: '#F9FAFB',
border: '2px solid #8B5CF6',
animation: 'glow 3s ease-in-out infinite',
},
pricingBadge: {
position: 'absolute',
top: '20px',
right: '20px',
padding: '6px 14px',
backgroundColor: '#8B5CF6',
color: 'white',
borderRadius: '100px',
fontSize: '12px',
fontWeight: '600',
},
planName: {
fontSize: '24px',
fontWeight: '600',
color: '#111827',
marginBottom: '16px',
},
planPrice: {
display: 'flex',
alignItems: 'baseline',
gap: '4px',
marginBottom: '12px',
},
priceAmount: {
fontSize: '48px',
fontWeight: '700',
color: '#111827',
letterSpacing: '-0.03em',
},
pricePeriod: {
fontSize: '16px',
color: '#9CA3AF',
fontWeight: '500',
},
savingsBadge: {
display: 'inline-block',
padding: '6px 12px',
backgroundColor: '#D1FAE5',
color: '#065F46',
borderRadius: '100px',
fontSize: '13px',
fontWeight: '600',
marginBottom: '24px',
},
featureList: {
listStyle: 'none',
padding: 0,
margin: '24px 0',
display: 'flex',
flexDirection: 'column',
gap: '12px',
},
featureItem: {
display: 'flex',
alignItems: 'center',
gap: '12px',
fontSize: '15px',
color: '#4B5563',
},
featureText: {
color: '#111827',
fontWeight: '400',
},
planButton: {
width: '100%',
padding: '14px',
backgroundColor: '#F3F4F6',
color: '#6B7280',
border: 'none',
borderRadius: '12px',
fontSize: '16px',
fontWeight: '600',
cursor: 'not-allowed',
transition: 'all 0.3s ease',
},
planButtonHighlighted: {
backgroundColor: '#8B5CF6',
color: 'white',
},
footer: {
position: 'relative',
padding: '60px 20px 32px',
backgroundColor: '#111827',
color: 'white',
zIndex: 1,
marginTop: '80px',
},
footerContent: {
maxWidth: '1280px',
margin: '0 auto',
display: 'grid',
gridTemplateColumns: '1fr',
gap: '40px',
marginBottom: '48px'
},
footerBrand: {
maxWidth: '100%'
},
footerLogo: {
fontSize: '22px',
fontWeight: '700',
marginBottom: '12px'
},
footerTagline: {
fontSize: '14px',
color: '#9CA3AF',
lineHeight: '1.6'
},
footerRight: {
display: 'flex',
justifyContent: 'flex-start',
},
footerEmail: {
fontSize: '14px',
color: '#9CA3AF'
}
};