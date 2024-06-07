import React from 'react';
import settings from '../config/settings';
import { commands, commonCommands } from '../config/helpCommands';
import { Box, Text, Popover, PopoverTrigger, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, PopoverFooter } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons'

const CommandListPopup = () => {
  const languageCommands = commands[settings.language] || [];

  return (
    <Box
    position= 'absolute'
    top= '30px'
    right= '10px'
    >
      
      <Popover>
        <PopoverTrigger>
          <InfoIcon />
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Liste de commandes :</PopoverHeader>

            <PopoverBody>
              <Text fontsize="lg">Compilation et exécution :</Text>
              <ul style={{textAlign: 'left', marginLeft: '5%' }}>
                {languageCommands.map((cmd, index) => (
                  <li key={index}>
                    {cmd.description} - <code>{cmd.command}</code>
                  </li>
                ))}
              </ul>

              <Text fontsize="lg">Navigation et gestion des fichiers :</Text>
              <ul style={{textAlign: 'left', marginLeft: '5%' }}>
                {commonCommands.map((cmd, index) => (
                  <li key={index}>
                    {cmd.description} - <code>{cmd.command}</code>
                  </li>
                ))}
              </ul>
            </PopoverBody>
            <PopoverFooter fontSize="xs"> Le copier coller n'est pas autorisé. Vous pouvez utilisez les flèches du haut et bas pour réutiliser les commandes précédentes </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
};

export default CommandListPopup;
