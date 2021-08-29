import React, { useRef, useCallback, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useRoomsUsers } from 'Hooks/roomsUsers';
import { useRooms } from 'Hooks/rooms';

const LeaveRoom: React.FC = () => {
  const { leaveRoom } = useRoomsUsers();
  const { currentRoom, indexUserRooms, setCurrentRoom } = useRooms();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef(null);

  const [loadingLeave, setLoadingLeave] = useState(false);

  const handleLeaveRoom = useCallback(async () => {
    if (!currentRoom) {
      return;
    }
    setLoadingLeave(true);
    await leaveRoom(currentRoom.id);
    await indexUserRooms();
    setCurrentRoom(null);
    setLoadingLeave(false);
  }, [leaveRoom, currentRoom, indexUserRooms, setCurrentRoom]);

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="leave room"
        icon={<FiLogOut size="20px" />}
        borderRadius="50%"
        colorScheme="orange"
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              leave room
            </AlertDialogHeader>

            <AlertDialogBody>
              are you sure you want to leave this room?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                mr="5px"
                isDisabled={loadingLeave}
                colorScheme="purple"
              >
                cancel
              </Button>
              <Button
                colorScheme="orange"
                onClick={handleLeaveRoom}
                isLoading={loadingLeave}
              >
                leave
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default LeaveRoom;
