// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./Election.sol";

contract ElectionFactory {

    Election[] public elections;
    mapping (uint256 => Election) public idToElection;
    event NewElection(address electionAddress, address indexed creator, uint256 indexed id, string indexed name); // Indexed allows to later filter results from events.


    // Public functions
    function getElections () external view returns (Election[] memory) {
        return elections;
    }

    function getElection (uint256 _id) external view returns (Election) {
        return elections[_id];
    }

    function getAvailableElections(uint256 _timestamp) external view returns (Election[] memory) {
        uint256 count = 0;
       
        // Determine the number of available elections
        for (uint256 i = 0; i < elections.length; i++) {
             uint256 completionTime =  elections[i].getCompletionTime();
            if (_timestamp < completionTime) {
                count++;
            }
        }
        
        // Create a fixed-size array with the determined count
        Election[] memory aux = new Election[](count);
        
        // Copy available elections to the aux array
        uint256 index = 0;
        for (uint256 i = 0; i < elections.length; i++) {
            uint256 completionTime =  elections[i].getCompletionTime();
            if (_timestamp < completionTime) {
                aux[index] = elections[i];
                index++;
            }
        }
        
        return aux;

        }

    // Private functions
    function createElection(string memory _name,
                             bytes memory _pubKey,
                             bytes memory _modulo,
                             uint256 _startTime,
                             uint256 _duration,
                             string[] memory _candidates) public returns (uint) {

        require(_duration >= 60 minutes, "No elections shorter than 1 hour allowed");
        require(_duration <= 5760 minutes, "No elections longer than 4 days allowed");


        uint256 id = elections.length;
        Election election = new Election(_name,
                                            id,
                                        _pubKey,
                                        _modulo,
                                        _startTime,
                                        _duration,
                                        _candidates);
        elections.push(election);
        idToElection[id] = election;
        emit NewElection(address(election), msg.sender, id, _name);
        return id;
    }

}
