import React from 'react';
import axios from 'axios';

const SendToGiteaButton = ({ studentId }) => {
    const handleSendToGitea = async () => {
        try {
            const response = await axios.post('http://localhost:5000/send_to_gitea', { studentId });
            if (response.status === 200) {
                alert('Fichiers envoyés à Gitea avec succès');
            }
        } catch (error) {
            if (error.response && error.response.data.error === 'Vous avez déjà envoyé un dossier dans la minute, veuillez patienter') {
                alert('Vous avez déjà envoyé un dossier dans la minute, veuillez patienter');
            } else {
                alert('Échec de l\'envoi des fichiers à Gitea');
            }
        }
    };

    return (
        <button onClick={handleSendToGitea}>
            Envoyer à Gitea
        </button>
    );
};

export default SendToGiteaButton;
