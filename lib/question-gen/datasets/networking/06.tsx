// datasets/computer-networks/lesson06.ts

import { Dataset } from "@/lib/question-gen/types/dataset";

export const networksLesson06Dataset: Dataset = {
  id: "networks-06",
  topicCount: 27,
  category: "Computer Networks",
  subcategory: "Data Link Layer",
  description: "Data Link Layer design issues including Services to Network Layer, Framing techniques, Flow Control, Error Control, Error Detection (Parity Check, Checksum, CRC), and Error Correction (Hamming Code).",
  topics: [
    "Data Link Layer Design Issues",
    "Services Provided to the Network Layer",
    "Unacknowledged Connectionless Service",
    "Acknowledged Connection-Oriented Service",
    "Comparison of Services",
    "Flow Control",
    "Error Control",
    "Relationship Between Packets and Frames",
    "Framing",
    "Frame Structure",
    "Fixed Length Frames",
    "Framing Methods",
    "Character Count Method",
    "Flag Byte with Byte Stuffing",
    "Bit Stuffing",
    "Physical Layer Encoding Violations",
    "Error Detection and Correction Overview",
    "Error Detection",
    "Error Correction",
    "Parity Check",
    "Checksum",
    "Hamming Code - Error Detection and Correction",
    "Hamming Code Algorithm",
    "Hamming Code Example - Encoding",
    "Hamming Code - Error Correction",
    "Summary of Error Detection Methods",
    "Key Concepts Summary",
  ],
  content: `
<TOPIC_START index="0" title="Data Link Layer Design Issues">
1.0 Data Link Layer Design Issues

The Data Link Layer has three main design issues:
1. Service provided to the Network Layer
2. Framing
3. Error Control
4. Flow Control
<TOPIC_END>

<TOPIC_START index="1" title="Services Provided to the Network Layer">
2.0 Services Provided to the Network Layer

2.1 Types of Services

The Data Link Layer provides three types of services to the Network Layer:
1. **Unacknowledged Connectionless Service**
2. **Acknowledged Connectionless Service**
3. **Acknowledged Connection-Oriented Service**
<TOPIC_END>

<TOPIC_START index="2" title="Unacknowledged Connectionless Service">
3.0 Unacknowledged Connectionless Service

3.1 Characteristics

Unacknowledged Connectionless service has the following characteristics:

| Feature | Description |
| :--- | :--- |
| **Error Rate** | Used when error rate is low |
| **Connection** | No connection establishment |
| **Frame Transmission** | Sends independent frames |
| **Acknowledgement** | No acknowledgement |
| **Flow Control** | No flow control |
| **Error Control** | No error control |

3.2 When to Use
This service is appropriate for:
* Real-time traffic (voice, video)
* Low error rate channels
* Applications where speed is more important than reliability
* Situations where higher layers handle error recovery
<TOPIC_END>

<TOPIC_START index="3" title="Acknowledged Connection-Oriented Service">
4.0 Acknowledged Connection-Oriented Service

4.1 Characteristics

Acknowledged Connection-Oriented service provides the following features:

| Feature | Description |
| :--- | :--- |
| **Connection** | Connection establishment |
| **Frame Numbering** | Each frame is numbered |
| **Delivery Order** | Frames delivered in serial order |
| **Acknowledgement** | Acknowledgement provided |
| **Guarantee** | Guarantees that all frames received |
| **Flow Control** | Flow control implemented |
| **Error Control** | Error control implemented |

4.2 Protocols Using This Service
Protocols that use this service include:
* HTTP
* FTP
* SMTP

4.3 When to Use
This service is appropriate for:
* Reliable data transfer requirements
* File transfers
* Important data transmission
* Applications requiring guaranteed delivery
<TOPIC_END>

<TOPIC_START index="4" title="Comparison of Services">
5.0 Comparison of Services

| Feature | Unacknowledged Connectionless | Acknowledged Connection-Oriented |
| :--- | :--- | :--- |
| **Connection Setup** | No | Yes |
| **Frame Numbering** | No | Yes |
| **Acknowledgement** | No | Yes |
| **Flow Control** | No | Yes |
| **Error Control** | No | Yes |
| **Delivery Guarantee** | No | Yes |
| **Use Case** | Low error rate | Reliable transmission |
<TOPIC_END>

<TOPIC_START index="5" title="Flow Control">
6.0 Flow Control

6.1 Definition

**Flow Control** refers to a set of procedures used to restrict the amount of data that the sender can send before waiting for acknowledgment.

6.2 Purpose of Flow Control

| Purpose | Description |
| :--- | :--- |
| **Prevent Overflow** | Prevents receiver buffer from overflowing |
| **Matching Speeds** | Coordinates sender and receiver speeds |
| **Resource Management** | Manages receiver's processing capacity |
| **Data Regulation** | Restricts amount of data sent before acknowledgment |

6.3 Flow Control Methods
* Stop-and-Wait
* Sliding Window Protocol
* Go-Back-N
* Selective Repeat
<TOPIC_END>

<TOPIC_START index="6" title="Error Control">
7.0 Error Control

7.1 Definition

Network is responsible for transmission of data from one device to another device. The end-to-end transfer of data from a transmitting application to a receiving application involves many steps, each subject to error.

With the **error control** process, we can be confident that the transmitted and received data are identical. Data can be corrupted during transmission. For reliable communication, errors must be detected and corrected.

7.2 Purpose of Error Control

| Purpose | Description |
| :--- | :--- |
| **Error Detection** | Detecting data corruption during transmission |
| **Data Integrity** | Ensuring transmitted and received data are identical |
| **Reliable Communication** | Providing reliable communication |
| **Error Correction** | Correcting detected errors |

7.3 Key Concept
Data can be corrupted during transmission. For reliable communication, errors must be detected and corrected.
<TOPIC_END>

<TOPIC_START index="7" title="Relationship Between Packets and Frames">
8.0 Relationship Between Packets and Frames

The Data Link Layer processes packets from the Network Layer and converts them into frames.

**Hierarchy:**
Network Layer $\rightarrow$ Packets $\rightarrow$ Data Link Layer $\rightarrow$ Frames $\rightarrow$ Physical Layer $\rightarrow$ Bits
<TOPIC_END>

<TOPIC_START index="8" title="Framing">
9.0 Framing

9.1 Definition

**Framing** is the translation of physical layer's raw bits into larger aggregate or discrete units called **frames**.

9.2 Types of Frames

There are two types of frames:
1. **Fixed Length Frames**
2. **Variable Length Frames**
<TOPIC_END>

<TOPIC_START index="9" title="Frame Structure">
10.0 Frame Structure

A frame consists of three main parts:

| Component | Description |
| :--- | :--- |
| **Header** | Frame starting bits, Address of source or destination, Type of data, Quality control |
| **Payload** | Actual data |
| **Trailer** | Frame stopping bits, Error detection |

10.1 Frame Components Detailed

**Header contains:**
* Frame starting bits
* Address of the source or destination
* Type of data
* Quality control

**Trailer contains:**
* Frame stopping bits
* Error detection
<TOPIC_END>

<TOPIC_START index="10" title="Fixed Length Frames">
11.0 Fixed Length Frames

11.1 Example Problem

Frame structure: 10 bits header + 20 bits payload + 10 bits trailer = 40 bits total

**Question:** 200 bits of data have to be transmitted as frames. How many frames have to be transmitted?

**Solution:**
* Each frame carries 20 bits of data (payload)
* Total data = 200 bits
* Number of frames = $200 \div 20 = 10$ frames

11.2 Characteristics of Fixed Length Frames
* Simple to implement
* Easy to detect frame boundaries
* May waste bandwidth if data does not fill frame
* Suitable for synchronous transmission
<TOPIC_END>

<TOPIC_START index="11" title="Framing Methods">
12.0 Framing Methods

12.1 The Framing Challenge

How to break down a stream of bits into smaller, digestible chunks called frames. How can frames be transmitted so the receiver can detect frame boundaries? That is, how can the receiver recognize the start and end of a frame?

12.2 Framing Techniques

There are four main framing methods:
1. **Character Count**
2. **Flag Byte with Byte Stuffing**
3. **Bit Stuffing**
4. **Physical Layer Encoding Violations**
<TOPIC_END>

<TOPIC_START index="12" title="Character Count Method">
13.0 Character Count Method

13.1 How It Works

Here a field in the header specifies the number of characters in the frame.
The Data Link Layer at the destination looks at the character count and decides the end of the frame.

13.2 Disadvantage

The main drawback of this method is if any count is garbled by a transmission error, then the destination is unable to decide the frames.

13.3 Characteristics

| Feature | Description |
| :--- | :--- |
| **Method** | Header field specifies character count |
| **Detection** | Destination uses count to find frame end |
| **Problem** | Transmission error in count causes frame loss |
| **Reliability** | Low - single error can cause desynchronization |
<TOPIC_END>

<TOPIC_START index="13" title="Flag Byte with Byte Stuffing">
14.0 Flag Byte with Byte Stuffing

14.1 The Problem

A serious problem occurs when binary data itself will contain flag byte's bit pattern. This situation will usually interfere with framing.

14.2 Solution: Byte Stuffing

One solution is **Flag Byte Stuffing** where sender's data link layer inserts a special **escape byte (ESC)** just before each accidental flag byte in the data.
At the receiving end, data link layer removes the escape byte before the data are given to the network layer.

14.3 Method Description

Each frame starts and ends with special bytes called **Flag Bytes**.
If the flag byte occurs in the frame, stuff an extra Escape byte (ESC).

14.4 How Byte Stuffing Works

**Sender's Actions:**
1. Start frame with FLAG byte
2. When FLAG appears in data, insert ESC before it
3. When ESC appears in data, insert ESC before it
4. End frame with FLAG byte

**Receiver's Actions:**
1. Remove FLAG bytes at start and end
2. When ESC is encountered, remove it and keep next byte
3. Deliver destuffed data to Network Layer

14.5 Example

| Stage | Data |
| :--- | :--- |
| **Original Data** | A FLAG B ESC C FLAG D |
| **After Stuffing** | FLAG A ESC FLAG B ESC ESC C ESC FLAG D FLAG |
| **After Destuffing** | A FLAG B ESC C FLAG D |

14.6 Characteristics

| Feature | Description |
| :--- | :--- |
| **Transparency** | Completely transparent to Network Layer |
| **Special Bytes** | FLAG and ESC |
| **Overhead** | Variable, depends on data content |
<TOPIC_END>

<TOPIC_START index="14" title="Bit Stuffing">
15.0 Bit Stuffing

15.1 Overview

Data frames can contain an arbitrary number of bits and allow character codes with an arbitrary number of bits per character.
Each frame begins and ends with a special bit pattern, **01111110 (flag byte)**.

15.2 Sender's Rule

Whenever the sender's data link layer encounters **five consecutive 1s** in the data, it automatically **stuffs a 0 bit** into the outgoing bit stream.

15.3 Receiver's Rule

When the receiver sees five consecutive incoming 1 bits, followed by a 0 bit, it automatically **destuffs the 0 bit**.

15.4 Transparency

Just as byte stuffing is completely transparent to the network layer in both computers, so is bit stuffing.

15.5 Example

If the user data contains the flag pattern, 01111110, this flag is transmitted as 011111010 but stored in the receiver's memory as 01111110.

15.6 Bit Stuffing Process

**Original Data:** 01001111110111111

**Analysis:**
* First sequence: 0100111111 (five 1s $\rightarrow$ stuff a 0)
* Second sequence: 0111111 (five 1s $\rightarrow$ stuff a 0)

**After Bit Stuffing:** 0100111110101111101

**After Destuffing:** 01001111110111111 (original data restored)

15.7 Bit Stuffing Illustration

Bit stuffing process:
* The original data
* The data as they appear on the line (with stuffed bits)
* The data as they are stored in the receiver's memory after destuffing (original restored)

15.8 Characteristics

| Feature | Description |
| :--- | :--- |
| **Flag Pattern** | 01111110 |
| **Stuffing Rule** | After five 1s, insert 0 |
| **Destuffing Rule** | After five 1s followed by 0, remove the 0 |
| **Flexibility** | Arbitrary number of bits allowed |
| **Transparency** | Completely transparent |
<TOPIC_END>

<TOPIC_START index="15" title="Physical Layer Encoding Violations">
16.0 Physical Layer Encoding Violations

16.1 Method Description

The final framing method is **physical layer coding violations** and is applicable to networks in which the encoding on the physical medium contains some redundancy.

In such cases, normally a **1 bit is a high-low pair** and a **0 bit is a low-high pair**.

The combinations of **low-low** and **high-high** which are not used for data may be used for marking frame boundaries.

16.2 How It Works

**Normal Encoding:**
* 1 bit $\rightarrow$ High-Low pair
* 0 bit $\rightarrow$ Low-High pair

**Frame Boundary Markers:**
* Low-Low $\rightarrow$ Start or End of frame
* High-High $\rightarrow$ Start or End of frame

16.3 Characteristics

| Feature | Description |
| :--- | :--- |
| **Requirement** | Physical medium must have redundancy |
| **Normal Coding** | 1 = high-low, 0 = low-high |
| **Boundary Markers** | Low-low and high-high |
| **Advantage** | No stuffing overhead required |
<TOPIC_END>

<TOPIC_START index="16" title="Error Detection and Correction Overview">
17.0 Error Detection and Correction Overview

17.1 What is an Error?

Error is a condition when the output information does not match with the input information. During transmission, digital signals suffer from noise that can introduce errors in the binary bits travelling from one system to other. That means a 0 bit may change to 1 or a 1 bit may change to 0.

17.2 Importance

Data can be corrupted during transmission. For reliable communication, errors must be detected and corrected.
<TOPIC_END>

<TOPIC_START index="17" title="Error Detection">
18.0 Error Detection

18.1 Definition

**Error detection** is the detection of errors caused by noise or other impairments during transmission from the transmitter to the receiver.

18.2 Error Detection Methods

There are three main error detection methods:
1. **Parity Check**
2. **Checksum**
3. **Cyclic Redundancy Check (CRC)**
<TOPIC_END>

<TOPIC_START index="18" title="Error Correction">
19.0 Error Correction

19.1 Definition

**Error correction** is the detection of errors and reconstruction of the original, error-free data.

19.2 Error Correction Method

**Hamming Code** (performs both Error Detection and Correction).
<TOPIC_END>

<TOPIC_START index="19" title="Parity Check">
20.0 Parity Check

20.1 Definition

A **parity check** uses an **additional bit**, added with original block to perform checking of data.

A **parity bit**, or check bit, is a bit added to the end of a string of binary code that indicates whether the number of bits in the string with the value one is even or odd. Parity bits are used as the simplest form of error detecting code.

20.2 Types of Parity

There are two types of parity:
1. **Even Parity**
2. **Odd Parity**

20.3 Even Parity Example

Original data: 0110000
* Count of 1s = 2 (even)
* Even parity bit = 0 (to keep count even)
* **Transmitted:** 01100000

Original data: 1101000
* Count of 1s = 3 (odd)
* Even parity bit = 1 (to make count even)
* **Transmitted:** 11010001

20.4 Odd Parity Example

For odd parity, the parity bit is set to ensure the total number of 1s is odd.

20.5 Characteristics

| Feature | Description |
| :--- | :--- |
| **Additional Bits** | One bit added |
| **Purpose** | Checking data integrity |
| **Complexity** | Simplest form of error detection |
| **Detection Capability** | Single bit errors |
| **Limitation** | Cannot detect even number of bit errors |
<TOPIC_END>

<TOPIC_START index="20" title="Checksum">
21.0 Checksum

21.1 Method Description

To compute the **checksum**, the sender treats the data unit as a sequence of a certain number of blocks, all with the same number of bits.
The sender and receiver agree on how long are the blocks.
The sender adds the blocks using **one's complement arithmetic** and creates an additional block with the same size.

21.2 How Checksum Works

**Sender's Process:**
1. Divide data into equal-sized blocks
2. Add all blocks using one's complement arithmetic
3. Take one's complement of the sum
4. This is the checksum
5. Append checksum to data

**Receiver's Process:**
1. Divide received data into blocks
2. Add all blocks including checksum
3. Take one's complement of the sum
4. If result is **all 0s**, no error detected
5. If result is **not all 0s**, error detected

21.3 Example

Data: 10000100 00100100 11100010 10011001

**Calculation Process:**
Add all blocks together using one's complement arithmetic, then take the complement of the result to get the checksum.

21.4 Characteristics

| Feature | Description |
| :--- | :--- |
| **Block Size** | Agreed between sender and receiver |
| **Arithmetic** | One's complement addition |
| **Checksum Size** | Same as block size |
| **Detection Capability** | Multiple bit errors |
<TOPIC_END>

<TOPIC_START index="21" title="Hamming Code - Error Detection and Correction">
22.0 Hamming Code - Error Detection and Correction

22.1 Overview

**Hamming Code** was given by R.W. Hamming.
It is easy to implement.
**7-bit hamming code** is used commonly.

22.2 Components

Hamming Code consists of:
* **Data bits** - Original information bits
* **Parity bits** - Redundant bits for error detection and correction
<TOPIC_END>

<TOPIC_START index="22" title="Hamming Code Algorithm">
23.0 Hamming Code Rules

The algorithm for creating Hamming Code:

**Step 1:** Write the bit positions starting from 1 in binary form (1, 10, 11, 100, etc).

**Step 2:** All the bit positions that are a **power of 2** are marked as **parity bits** (1, 2, 4, 8, etc).

**Step 3:** All the other bit positions are marked as **data bits**.

**Step 4:** Each data bit is included in a unique set of parity bits, as determined by its bit position in binary form:
* Parity bit 1 covers all the bit positions whose binary representation includes a **1 in the least significant position** (1, 3, 5, 7, 9, 11, etc)
* Parity bit 2 covers all the bit positions whose binary representation includes a **1 in the second position** from the least significant bit (2, 3, 6, 7, 10, 11, etc)
* Parity bit 4 covers all the bit positions whose binary representation includes a **1 in the third position** from the least significant bit (4 to 7, 12 to 15, 20 to 23, etc)

**Step 5:** Since we check for even parity, set a parity bit to **1** if the total number of ones in the positions it checks is **odd**.

**Step 6:** Set a parity bit to **0** if the total number of ones in the positions it checks is **even**.
<TOPIC_END>

<TOPIC_START index="23" title="Hamming Code Example - Encoding">
24.0 Hamming Code Example - Encoding

24.1 Example: Data = 1101

For data 1101, the Hamming code structure is: $\text{P1 P2 D3 P4 D5 D6 D7}$

**Bit Positions:**
* Position 1 (P1) - Parity bit
* Position 2 (P2) - Parity bit
* Position 3 (D3) - Data bit = 1
* Position 4 (P4) - Parity bit
* Position 5 (D5) - Data bit = 1
* Position 6 (D6) - Data bit = 0
* Position 7 (D7) - Data bit = 1

**Calculate Parity Bits (Assuming Even Parity):**

**P1 (checks positions 1, 3, 5, 7):**
* D3 = 1, D5 = 1, D7 = 1 $\rightarrow$ Count = 3 (odd)
* P1 = **1** (to make count even)

**P2 (checks positions 2, 3, 6, 7):**
* D3 = 1, D6 = 0, D7 = 1 $\rightarrow$ Count = 2 (even)
* P2 = **0** (already even)

**P4 (checks positions 4, 5, 6, 7):**
* D5 = 1, D6 = 0, D7 = 1 $\rightarrow$ Count = 2 (even)
* P4 = **0** (already even)

**Result:** **1 0 1 0 1 0 1**
<TOPIC_END>

<TOPIC_START index="24" title="Hamming Code - Error Correction">
25.0 Hamming Code - Error Correction

25.1 Example Problem

If the 7-bit hamming code word received is **1011011**. Assuming even parity, state whether the received code word is correct or wrong. If wrong, locate the bit having error.

**Solution:**

**Received Code:** 1 0 1 1 0 1 1

**Check Parity Bits:**

**P1 (positions 1, 3, 5, 7):**
* Values: 1, 1, 0, 1 $\rightarrow$ Count = 3 (odd) $\rightarrow$ Error indicator C1 = **1**

**P2 (positions 2, 3, 6, 7):**
* Values: 0, 1, 1, 1 $\rightarrow$ Count = 3 (odd) $\rightarrow$ Error indicator C2 = **1**

**P4 (positions 4, 5, 6, 7):**
* Values: 1, 0, 1, 1 $\rightarrow$ Count = 3 (odd) $\rightarrow$ Error indicator C4 = **1**

**Error Position:** C4 C2 C1 = 111 (binary) = **7** (decimal)

**Conclusion:** Error is at position 7. Flip bit 7 to correct.

**Corrected Code:** **1 0 1 1 0 1 0**
<TOPIC_END>

<TOPIC_START index="25" title="Summary of Error Detection Methods">
26.0 Summary of Error Detection Methods

| Method | Redundancy | Detection Capability | Correction Capability | Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Parity Check** | 1 bit | Single bit errors | No | Simplest |
| **Checksum** | One block | Multiple bit errors | No | Moderate |
| **CRC** | Variable | Burst errors | No | Moderate |
| **Hamming Code** | $\log_2(n)$ bits | Single bit errors | Yes | Higher |
<TOPIC_END>

<TOPIC_START index="26" title="Key Concepts Summary">
27.0 Key Concepts Summary

27.1 Data Link Layer Services
* Unacknowledged Connectionless - No guarantees
* Acknowledged Connection-Oriented - Reliable delivery

27.2 Flow Control
* Restricts data amount before acknowledgment

27.3 Error Control
* Ensures transmitted and received data are identical
* Detects and corrects corruption

27.4 Framing
* Converts raw bits into frames
* Methods: Character Count, Byte Stuffing, Bit Stuffing, Physical Layer Violations

27.5 Error Detection
* Parity Check - Simplest method
* Checksum - Uses one's complement arithmetic

27.6 Error Correction
* Hamming Code - Detects and corrects errors
* Easy to implement, 7-bit commonly used
<TOPIC_END>
`
};